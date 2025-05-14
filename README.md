# 📘 UI5 Documentation Showcase App

This project is a **UI5 application** designed to display Markdown-generated documentation views.  
It uses the [`md-to-sapui5-xml`](https://www.npmjs.com/package/md-to-sapui5-xml) CLI tool to convert a Markdown file into a SAPUI5 XML View and renders it dynamically inside the app.

---

## 🎯 Purpose

The purpose of this project is to:

- Showcase how Markdown content can be transformed into fully functional SAPUI5 XML views
- Serve as a live preview environment for testing `md-to-sapui5-xml`
- Demonstrate how dynamic documentation can be embedded into real UI5 apps using CLI-based pipelines

---

## 🚀 How to Run This App

### 1. Navigate to the app folder

From the root of the project, change directory into the UI5 app:

```bash
cd ui5-app
```

---

### 2. Generate the Documentation View

This step transforms your Markdown into a SAPUI5-compatible XML view.

```bash
npm run generate-documentation
```

> 🛠 This command will run `md-to-sapui5-xml` using the config file located in `ui5-app/md-to-sapui5.config.json`.

It will generate:

- A view at `webapp/view/Main.view.xml`
- Optionally, navigation fragments if `withNav` is enabled

---

### 3. Start the App

Once the view is generated, launch the local development server:

```bash
npm run start
```

Then visit:

```
http://localhost:8080/index.html
```

> 🔍 You should see the rendered SAPUI5 documentation view, styled and navigable just like a native UI5 screen.

---

## 📁 Project Structure (Relevant Parts)

```
ui5-app/
├── webapp/
│   ├── controller/
│   │   └── Main.controller.ts
│   ├── view/
│   │   ├── Main.view.xml          # ← Generated view
│   │   └── NavigationFragment.fragment.xml (optional)
│   ├── data/
│   │   └── md.md                  # ← Markdown input
├── md-to-sapui5.config.json       # ← CLI config
├── package.json
```

---

## 📦 Available NPM Scripts

| Script                           | Description                                                 |
| -------------------------------- | ----------------------------------------------------------- |
| `npm run generate-documentation` | Runs the `md-to-sapui5-xml` CLI to generate the SAPUI5 view |
| `npm run start`                  | Starts the local UI5 development server using UI5 tooling   |

---

## 🧠 Tips

- You can edit `webapp/data/md.md` to test different Markdown inputs.
- Toggle `withNav` in the config file to enable or disable the side navigation.
- If you run into caching issues, try clearing the `Main.view.xml` before regenerating it.

---
