# Heart Attack Prediction App - Deployment Configuration

## Environment Variables

This file contains the deployment URLs and configuration for the Heart Attack Prediction application.

### Frontend (Next.js Client)
- **File**: `client/.env.local`
- **Variables**:
  - `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL
  - `NEXT_PUBLIC_FASTAPI_BACKEND_URL`: Your Render FastAPI backend URL

### Backend (FastAPI)
- **Current Backend URL**: `https://heart-attack-prediction-zhcl.onrender.com`
- **Health Check**: `https://heart-attack-prediction-zhcl.onrender.com/health`

### Configuration Files Created
1. ✅ `client/.env.local` - Contains the deployment URLs
2. ✅ `.env` - Existing environment file (update as needed)

### How to Update URLs
1. Replace `https://your-vercel-domain.vercel.app` with your actual Vercel domain
2. Replace `https://heart-attack-prediction-zhcl.onrender.com` if you deploy to a different Render URL

### Example Usage in Code
```typescript
// In your Next.js components
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const backendUrl = process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL;
```

### Deployment Checklist
- [ ] Update `NEXT_PUBLIC_APP_URL` with your Vercel domain
- [ ] Update `NEXT_PUBLIC_FASTAPI_BACKEND_URL` with your Render URL
- [ ] Test the application after deployment
- [ ] Verify API endpoints are working correctly
