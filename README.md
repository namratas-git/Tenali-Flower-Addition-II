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

The activity follows a structured concrete-to-representational learning sequence across clear stages:

$$\text{Count First Group} \longrightarrow \text{Count Second Group} \longrightarrow \text{Auto-Reveal Total Flowers} \longrightarrow \text{Count Total Flowers} \longrightarrow \text{Select Correct Answer}$$

1. **Stage One — Count the First Group & Second Group**:
   - The Combined Total box starts **completely empty**.
   - The child counts flowers in the **First Group** box by tapping each blossom. Any flower can be tapped first as **1**, with subsequent blossoms numbered **2, 3...** in touch order.
   - Counting is restricted to the active box until completed.
   - When the First Group is complete, the **plus ($+$) sign activates a soft, noticeable glow**.
   - The child then counts the **Second Group** box, restarting independently from **1**.
   - When the Second Group is complete, the plus glow turns off and the **equals ($=$) sign activates a gentle glow**.

2. **Stage Two — Automatically Reveal Combined Total Flowers**:
   - The child **never has to tap the blank Combined Total box** to make flowers appear.
   - As the child counts flowers in either First Group or Second Group:
     - Each valid counting tap in the First Group reveals exactly one corresponding flower in the Combined Total box on the right.
     - Each valid counting tap in the Second Group reveals another corresponding flower in the Combined Total box on the right.
     - Previously revealed flowers stay visible. The number of visible flowers in the Combined Total box always matches the cumulative number of flowers counted across both groups.
     - These newly revealed flowers initially appear **unnumbered (blank sunny yellow center)**.

3. **Stage Three — Count the Combined Total Flowers**:
   - Once both First Group and Second Group are fully counted, independent counting of the Combined Total flowers unlocks.
   - The child taps each revealed flower in the Combined Total box individually:
     - Counting starts from **1**.
     - Each valid tap reveals the counting number (**1, 2, 3...**) inside that flower's sunny yellow center.
     - The child can tap the revealed flowers in any order; numbers are assigned according to the child's tap order (not physical position).
     - Each flower can be counted only once. Tapping an already-counted flower provides gentle tactile bounce feedback without changing the count or the assigned number.

4. **Stage Four — Voice Announcement & Answer Selection**:
   - After all Combined Total flowers have been counted, the equals sign glow turns off.
   - The teacher voice announces warmly: *“We have [total] flowers in total.”*
   - Answer option buttons remain disabled until the voice message completes, preventing accidental early tapping.
   - Once the announcement completes, the three flower-shaped answer buttons unlock with an animated pop.
   - The child selects the correct flower answer.
   - A correct selection triggers arpeggio fanfare, confetti bursts, encouraging teacher narration (*"Excellent! [num1] plus [num2] is [total]. Good job!"*), and an earned gold star.

5. **Count Again & Round Resets**:
   - Clicking the top-right **“↻ Count Again”** button resets the current round without losing level progress or score:
     - Combined Total box returns to completely empty.
     - Counters in all boxes reset to 0.
     - All flowers in Group 1 and Group 2 become uncounted with hidden numbers.
     - Equation symbol glows turn off and answer buttons re-lock.
     - The child can count from scratch.

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
