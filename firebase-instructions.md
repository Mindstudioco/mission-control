# Firebase Setup Instructions

## 1. Firestore Rules (Security)

Go to: https://console.firebase.google.com/project/dashboardmindagents/firestore/rules

Paste the contents of `firestore.rules` into the rules editor.

Click "Publish".

## 2. Initialize Data

Run locally (requires Node.js):
```bash
cd mission-control
npm install
node scripts/init-firebase.js
```

This will create 8 demo tasks in Firestore.

## 3. Verify

Go to: https://console.firebase.google.com/project/dashboardmindagents/firestore/data

You should see a "tasks" collection with 8 documents.

## 4. Kanban Live

Once data is in Firestore, the Kanban will show real tasks instead of the demo placeholder.
