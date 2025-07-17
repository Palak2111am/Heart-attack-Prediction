import os
import logging
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import joblib

# ─── Paths ────────────────────────────────────────────────────────────────────
# cwd should be your project root (where you run `python app/model/train_model.py`)
PROJECT_ROOT = os.getcwd()

# Data now lives in <PROJECT_ROOT>/data/Heart_Attack_data.csv
DATA_PATH = os.path.join(PROJECT_ROOT, "data", "Heart_Attack_data.csv")

# Save scaler & model inside app/model/
MODEL_DIR   = os.path.join(PROJECT_ROOT, "app", "model")
SCALER_PATH = os.path.join(MODEL_DIR, "Heart_Attack_scaler.joblib")
MODEL_PATH  = os.path.join(MODEL_DIR, "Heart_Attack_model.joblib")

# ─── Config ───────────────────────────────────────────────────────────────────
RESULT_COLUMN          = "output"
TEST_SIZE              = 0.2
RANDOM_STATE           = 62
CROSS_VALIDATION_FOLDS = 7

# ─── Functions ─────────────────────────────────────────────────────────────────
def load_data(path: str) -> pd.DataFrame:
    if not os.path.isfile(path):
        logging.error(f"Dataset not found at: {path}")
        raise FileNotFoundError(f"Dataset not found at: {path}")
    return pd.read_csv(path)

def normalize_data(X: pd.DataFrame):
    scaler = StandardScaler()
    return scaler.fit_transform(X), scaler

def split_data(X, y):
    return train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

def train_and_save_model(X_train, y_train):
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)
    joblib.dump(model, MODEL_PATH)
    return model

def evaluate(model, X_test, y_test):
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cv  = cross_val_score(model, X_test, y_test, cv=CROSS_VALIDATION_FOLDS).mean()
    return acc, cv

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    print(f"Working directory: {PROJECT_ROOT}")
    print(f"Looking for data at: {DATA_PATH}")
    df = load_data(DATA_PATH)
    print("[OK] Data loaded successfully!")

    # Prepare features & target
    X = df.drop(columns=[RESULT_COLUMN])
    y = df[RESULT_COLUMN]

    # Normalize & save scaler
    X_norm, scaler = normalize_data(X)
    joblib.dump(scaler, SCALER_PATH)
    print(f"[OK] Scaler saved to: {SCALER_PATH}")

    # Split, train, save
    X_train, X_test, y_train, y_test = split_data(X_norm, y)
    model = train_and_save_model(X_train, y_train)
    print(f"[OK] Model saved to: {MODEL_PATH}")

    # Evaluate
    acc, cv = evaluate(model, X_test, y_test)
    print(f"Model Accuracy:         {acc:.4f}")
    print(f"Cross Validation Score: {cv:.4f}")

if __name__ == "__main__":
    main()
