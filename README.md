# Tenali Flower Addition II

An interactive visual addition and early numeracy web activity designed for preschool and kindergarten children (ages 4–5). Aligned with **Foundational Literacy and Numeracy (FLN)** goals, the activity bridges concrete visual manipulation and symbolic arithmetic by presenting addition as two distinct sets combining into an exact unified total:

$$\text{[First Group of Flowers]} + \text{[Second Group of Flowers]} = \text{[Combined Total of Flowers]}$$

Follows the authentic **Tenali math curriculum visual design system** with a warm dark amber/brown ambient shell (`#160f0a`), glowing orange accents, scholar mascot illustration, and a crisp white activity card featuring scalloped purple-and-yellow vector blossoms.

---

## 🎯 Learning Objectives (Ages 4–5)

- **Concrete-to-Representational Transition**: Children see the addition equation represented visually with real object sets before choosing the abstract numeral answer.
- **Order-Irrelevance Principle (Conservation of Number)**: Children discover that counting the flowers in any sequence (middle first, right first, or left first) yields the exact same total.
- **Cardinality & One-to-One Correspondence**: Tapping each blossom pairs one spoken count word with one flower, revealing the count directly inside its sunny yellow center.
- **Set Union (Part-Part-Whole Thinking)**: Visualizing two separate addend groups merging into one combined group builds intuitive understanding of the addition operator ($+$) and equals sign ($=$).

---

## 🌸 How the Activity Works

1. **Counting the First Group**:
   - The child taps the flowers inside the **First Group** box.
   - Any flower can be tapped first as **1**. Each subsequent blossom receives the next consecutive number (**2, 3...**) based on selection order.
   - Counting remains restricted to the active box until completed or reset.
2. **Counting the Second Group**:
   - Once the first box is complete, the child moves to the **Second Group** box.
   - The counting sequence restarts independently at **1**, allowing any flower in the second group to be chosen first.
3. **Counting the Combined Total**:
   - The child taps the flowers in the **Combined Total** box, which always displays exactly the sum of the first two groups.
   - Counting begins at **1** and proceeds to the final sum in whichever order the child taps.
4. **Selecting the Correct Answer**:
   - Three flower-shaped answer buttons appear below the equation, with numerals displayed directly inside their yellow centers.
   - The child taps the flower with the correct total to solve the equation ($2 + 2 = 4$).
   - A correct selection triggers fanfare chords, confetti bursts, encouraging teacher narration, and an earned gold star.

---

## 📚 The Three Levels

The activity follows strict progression with zero mid-game level leaping:

- **Level 1 — Totals up to 4**:
  - Focuses on foundational pairs: $1+1=2$, $2+2=4$, $1+2=3$, $1+3=4$, $2+1=3$, $3+1=4$.
  - 10 rounds to earn 10 Quest Stars.
- **Level 2 — Totals up to 6**:
  - Expands combinations: $2+3=5$, $3+3=6$, $1+4=5$, $3+2=5$, $2+4=6$, $4+1=5$, $4+2=6$, $1+5=6$, $5+1=6$.
  - 10 rounds to earn 10 Quest Stars.
- **Level 3 — Totals up to 9**:
  - Advanced single-digit addition: $3+4=7$, $4+4=8$, $2+5=7$, $4+5=9$, $4+3=7$, $3+5=8$, $5+2=7$, $5+3=8$, $5+4=9$, $2+6=8$, $3+6=9$, $2+7=9$.
  - 10 rounds to complete the addition mastery quest.

---

## 🌟 Key Features

- **Flexible Order-Irrelevant Flower Counting**:
  - Children are free to tap any flower first—middle, right, or left. The first flower tapped always receives number **1**, followed by **2, 3, …** in order of touch.
- **Single Top-Right "↻ Count Again" Button**:
  - Compact white pill button with light-green border, circular green reset icon, and dark-green text.
  - Safely restarts the current round’s counting sequence from the beginning without skipping the round or losing score progress.
- **"💡 Count with Me" Guided Sequence**:
  - An animated guide walks through the equation from left to right, lighting up flowers one-by-one with auditory pops and spoken counts.
- **Equation-Symbol Glow Effects**:
  - **After First Group**: The **`+` (plus)** sign glows with a soft, warm amber glow to show groups are being added.
  - **During Second Group**: The `+` sign stays glowing as the second group is counted.
  - **After Second Group**: The `+` glow turns off and the **`=` (equals)** sign illuminates to indicate the combined total.
  - **Reset**: Both symbols smoothly return to normal when the sequence completes, when Count Again is tapped, or when a new round begins.
- **Indian Preschool Teacher Voice (`TeacherVoiceEngine`)**:
  - Warm, gentle, patient Indian English female voice (`en-IN`, rate: `0.83`, pitch: `1.08`) providing encouraging spoken feedback: *"Excellent! Two plus two is four. Good job!"*
  - Includes an easily accessible parent/teacher voice mute toggle in the navigation header.
- **Zero-Dependency Web Audio API Synthesizer (`SoundEngine`)**:
  - 100% offline synthesizer generating harmonic bubble pops (pitch scales dynamically with count index), cheerful major chords, and gentle chime cues without external audio files.
- **100% Static & Serverless**:
  - Self-contained client-side application with zero backend requirements. Ready for GitHub Pages deployment out of the box.
- **Fully Responsive**:
  - Beautifully proportioned on desktop screens, Chromebooks, iPads, tablets, and mobile smartphones without horizontal scrolling or overlapping.

---

## 📁 Project Structure

```text
Tenali-Flower-Addition-II/
├── index.html                        # Main HTML5 entry point (<meta charset="UTF-8">)
├── styles.css                        # Complete visual design, layouts & animations
├── game.js                           # Core gameplay logic, audio synth, teacher speech & scheduler
├── tenali_mascot.png                 # Authentic Tenali scholar mascot illustration
├── flower_addition_ii_standalone.html# Self-contained single-file bundle with inlined assets
├── assets/
│   └── images/
│       └── tenali_mascot.png         # Organized copy of mascot asset
├── .gitignore                        # Standard Git exclusions (OS files, editor artifacts)
└── README.md                         # Complete project documentation
```

---

## 🚀 How to Run Locally

Because this project is a purely static web application, no build steps, bundlers, or package managers (`npm`, `pnpm`, `yarn`) are required:

### Option 1: Directly in Browser
Double-click [`index.html`](index.html) or open it with any modern web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Via Local HTTP Server
Using Python (pre-installed on most operating systems):
```bash
# Python 3
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🌐 Deploying to GitHub Pages

Follow these step-by-step instructions to publish the activity to GitHub Pages:

### Step 1: Create a New GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. Click **New repository** (or visit `https://github.com/new`).
3. Set the repository name to: **`Tenali-Flower-Addition-II`**.
4. Set visibility to **Public**.
5. Leave "Add a README file", ".gitignore", and "license" **unchecked** (we already have them prepared).
6. Click **Create repository**.

### Step 2: Push the Project to GitHub
In your terminal (inside the project root directory):
```bash
# Initialize git if not already initialized
git init

# Add all project files
git add .

# Create the initial release commit
git commit -m "Initial release: Tenali Flower Addition II"

# Rename branch to main
git branch -M main

# Link to your new GitHub repository (replace <your-username> with your GitHub username)
git remote add origin https://github.com/<your-username>/Tenali-Flower-Addition-II.git

# Push the code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repository on GitHub, click the **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and directory `/ (root)`.
4. Click **Save**.

### Step 4: Access Your Live Game
Within 1 to 2 minutes, GitHub Pages will deploy the activity. Your live website URL will be:

> 🔗 **Live Website URL**: `https://<your-username>.github.io/Tenali-Flower-Addition-II/`  
> *(Replace `<your-username>` with your GitHub username once deployed)*

---

## 📜 Credits & Licensing

- **Brand & Activity Design**: Developed as part of the *Tenali Puzzles & Games* early childhood foundational numeracy curriculum.
- **Typography**: 
  - *DM Serif Display* by Colophon Foundry (Google Fonts / SIL Open Font License).
  - *Fredoka* by Hafontia (Google Fonts / SIL Open Font License).
  - *Nunito* by Vernon Adams (Google Fonts / SIL Open Font License).
- **Artwork & Graphics**: Procedural SVG flower blossoms and illustrations designed specifically for Tenali FLN numeracy learning.
- **Audio & Speech**: Built-in Web Audio API oscillator synthesis and standard W3C Web SpeechSynthesis API.
- **License**: MIT License. Free for educational and non-commercial classroom use.
