# GitLab Triage Accelerator 🚀

A high-performance browser extension designed for Cybersecurity L1/L2 Analysts to automate repetitive triage tasks within GitLab environments.

## ⚡ The Problem
High-volume security triage often requires repetitive manual entry of common findings, assignment of leads, and issue closure. This creates a bottleneck in response times and increases the risk of manual entry errors during high-stress shifts.

## 🛠️ The Solution
The **GitLab Triage Accelerator** injects a customizable automation layer directly into the GitLab UI. It allows analysts to execute complex multi-step actions (commenting, labeling, assigning, and closing) with a single click or a keyboard shortcut.

## ✨ Key Features
- **Customizable Quick Actions:** Define your own triage categories, slash commands, and labels via a dedicated options page.
- **Global Hotkeys:** Trigger actions instantly using `Alt + [Key]` shortcuts, removing the need for mouse interaction.
- **Floating Action Bar:** A non-intrusive UI overlay that follows you as you scroll, keeping triage tools accessible at all times.
- **Smart Event Injection:** Uses debounced MutationObservers and simulated keyboard events to ensure compatibility with GitLab's dynamic Single Page Application (SPA) architecture.
- **Optimized for Triage:** Specifically built to handle the fast-paced requirements of Cybersecurity L1/L2 workflows.

## 🚀 Installation

### For Chrome/Brave/Edge:
1. Clone this repository or download the source code.
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right toggle).
4. Click **Load unpacked** and select the directory containing these files.

### For Mobile (Kiwi Browser):
1. Zip the extension files.
2. Open Kiwi Browser and go to `kiwi://extensions`.
3. Enable **Developer Mode**.
4. Click **+ (from .zip)** and select your archive.

## 📖 Usage
1. Click the extension icon to open the **Options Page**.
2. Configure your common triage responses (e.g., `✅ Clean`, `⚠️ Suspicious`).
3. Assign a unique shortcut key for each action.
4. On any GitLab issue page, use `Alt + [Key]` or click the floating button to execute the triage flow instantly.

---
*Created by Muhammad Abdullah (2026)*