import os
import logging
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import joblib
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ─── Paths ────────────────────────────────────────────────────────────────────
PROJECT_ROOT = Path.cwd()
DATA_PATH = PROJECT_ROOT / "data" / "Heart_Attack_data.csv"
MODEL_DIR = PROJECT_ROOT / "app" / "model"
SCALER_PATH = MODEL_DIR / "Heart_Attack_scaler.joblib"
MODEL_PATH = MODEL_DIR / "Heart_Attack_model.joblib"

# ─── Config ───────────────────────────────────────────────────────────────────
RESULT_COLUMN = "output"
TEST_SIZE = 0.2
RANDOM_STATE = 62
CROSS_VALIDATION_FOLDS = 7

# ─── Functions ─────────────────────────────────────────────────────────────────
def ensure_directory_exists(path: Path) -> None:
    """Ensure the directory exists, create if it doesn't."""
    path.mkdir(parents=True, exist_ok=True)

def load_data(path: Path) -> pd.DataFrame:
    """Load dataset from CSV file."""
    if not path.exists():
        logger.error(f"Dataset not found at: {path}")
        raise FileNotFoundError(f"Dataset not found at: {path}")
    
    logger.info(f"Loading data from: {path}")
    return pd.read_csv(path)

def normalize_data(X: pd.DataFrame) -> tuple[pd.DataFrame, StandardScaler]:
    """Normalize features using StandardScaler."""
    scaler = StandardScaler()
    X_normalized = scaler.fit_transform(X)
    logger.info("Data normalized successfully")
    return X_normalized, scaler

def split_data(X, y) -> tuple:
    """Split data into training and testing sets."""
    return train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

def train_and_save_model(X_train, y_train, model_path: Path) -> LogisticRegression:
    """Train logistic regression model and save it."""
    try:
        model = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
        model.fit(X_train, y_train)
        
        ensure_directory_exists(model_path.parent)
        joblib.dump(model, model_path)
        logger.info(f"Model saved to: {model_path}")
        return model
    except Exception as e:
        logger.error(f"Error training/saving model: {e}")
        raise

def evaluate_model(model, X_test, y_test) -> tuple[float, float]:
    """Evaluate model performance."""
    try:
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        cv_score = cross_val_score(model, X_test, y_test, cv=CROSS_VALIDATION_FOLDS).mean()
        
        logger.info(f"Model accuracy: {accuracy:.4f}")
        logger.info(f"Cross-validation score: {cv_score:.4f}")
        
        return accuracy, cv_score
    except Exception as e:
        logger.error(f"Error evaluating model: {e}")
        raise

def main():
    """Main training pipeline."""
    try:
        logger.info(f"Working directory: {PROJECT_ROOT}")
        logger.info(f"Looking for data at: {DATA_PATH}")
        
        # Load and prepare data
        df = load_data(DATA_PATH)
        logger.info("Data loaded successfully!")
        
        X = df.drop(columns=[RESULT_COLUMN])
        y = df[RESULT_COLUMN]
        
        # Normalize and save scaler
        X_normalized, scaler = normalize_data(X)
        ensure_directory_exists(SCALER_PATH.parent)
        joblib.dump(scaler, SCALER_PATH)
        logger.info(f"Scaler saved to: {SCALER_PATH}")
        
        # Split, train, and evaluate
        X_train, X_test, y_train, y_test = split_data(X_normalized, y)
        model = train_and_save_model(X_train, y_train, MODEL_PATH)
        
        accuracy, cv_score = evaluate_model(model, X_test, y_test)
        
        print(f"\n{'='*50}")
        print(f"MODEL TRAINING COMPLETE")
        print(f"{'='*50}")
        print(f"Model Accuracy:         {accuracy:.4f}")
        print(f"Cross Validation Score: {cv_score:.4f}")
        print(f"{'='*50}")
        
    except Exception as e:
        logger.error(f"Training pipeline failed: {e}")
        raise

if __name__ == "__main__":
    main()