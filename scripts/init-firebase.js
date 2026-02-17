// Script: Initialize Firebase with demo tasks
// Run: node scripts/init-firebase.js

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAOs7udKzlXZntlJ1rl13NPWCIsZG81ArU",
  authDomain: "dashboardmindagents.firebaseapp.com",
  projectId: "dashboardmindagents",
  storageBucket: "dashboardmindagents.firebasestorage.app",
  messagingSenderId: "943304496189",
  appId: "1:943304496189:web:e52beb89db861375680654",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const demoTasks = [
  { title: "Setup Firebase Hosting", description: "Deploy Kanban to production", priority: "high", status: "done", assignee: "Sonny", tag: "Infrastructure" },
  { title: "Create Agent Briefing System", description: "Daily automated reports at 7am", priority: "high", status: "inprogress", assignee: "Sonny", tag: "Operations" },
  { title: "Connect Vercel Auto-deploy", description: "CI/CD pipeline from GitHub", priority: "high", status: "review", assignee: "Sonny", tag: "DevOps" },
  { title: "Design Social Media Strategy", description: "Q1 content calendar for all channels", priority: "medium", status: "todo", assignee: "Catalina", tag: "Marketing" },
  { title: "SEO Audit", description: "Technical analysis and recommendations", priority: "blocked", status: "backlog", assignee: "Sara", tag: "SEO" },
  { title: "Brand Assets v3", description: "Update logo pack and guidelines", priority: "medium", status: "inprogress", assignee: "Esteban", tag: "Design" },
  { title: "Community Engagement Report", description: "Weekly metrics from Telegram", priority: "low", status: "backlog", assignee: "Alejandra", tag: "Community" },
  { title: "Agent Onboarding Flow", description: "Document SOUL.md templates", priority: "medium", status: "todo", assignee: "Vivi", tag: "Strategy" },
];

async function initTasks() {
  console.log("Initializing tasks in Firestore...\n");
  
  for (const task of demoTasks) {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...task,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      console.log(`✅ Created: ${task.title} (${task.status})`);
    } catch (error) {
      console.error(`❌ Failed: ${task.title}`, error.message);
    }
  }
  
  console.log("\n✨ Done! Tasks initialized in Firestore.");
  process.exit(0);
}

initTasks();
