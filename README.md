# Tenali Puzzles & Games - Flower Addition II

An interactive visual addition activity designed for preschool children (ages 4–5) focused on Foundational Literacy and Numeracy (FLN). The activity bridges concrete objects and symbolic addition by showing arithmetic as sets combining into a unified total:

$$\text{[Group 1 of flowers]} + \text{[Group 2 of flowers]} = \text{[Combined group of flowers]}$$

Follows the authentic **Tenali math curriculum visual design system** with a warm dark amber/brown ambient shell (`#160f0a`), glowing orange accents, scholar mascot illustration, and a crisp white activity canvas with scalloped SVG blossoms.

---

## 🌟 Key Features

- **Concrete-to-Representational Addition Visualisation**:
  - Instead of requiring children to compute totals abstractly in their head, the activity shows the addition process visually:
    $$\text{e.g., } 2\text{ flowers} + 2\text{ flowers} = 4\text{ flowers}$$
  - The first dashed pale-green container holds Group 1.
  - The second dashed container holds Group 2.
  - The result container holds the **combined total** containing exactly the sum of the first two groups.
- **Tactile Flower-Petal Counting**:
  - Children can tap flowers in Group 1, Group 2, or the Combined Group to hear cheerful musical bubble pops and spoken numbers in the sunny yellow centres.
- **Three Flower-Shaped Answer Buttons**:
  - Located directly below the equation.
  - Numbers appear directly inside the yellow centres.
  - Child selects the matching total to complete the equation ($2 + 2 = 4$).
- **3 Structured Levels (Strict Zero Mid-Game Level Leaping)**:
  - **Level 1**: Totals up to 4 ($1+1, 2+2, 1+2, 1+3, 2+1, 3+1$)
  - **Level 2**: Totals up to 6 ($2+3, 3+3, 1+4, 3+2, 2+4, 4+1, 4+2, 1+5, 5+1$)
  - **Level 3**: Totals up to 9 ($3+4, 4+4, 2+5, 4+5, 4+3, 3+5, 5+2, 5+3, 5+4 \dots$)
- **Interleaved Spaced Repetition**:
  - Exercises are introduced in dynamic triplets and repeated after two different intervening questions to build durable recall, pattern recognition, and mathematical fluency.
- **10 Quest Stars Per Level**:
  - A progress strip tracks 10 gold stars earned through mastery of each level before unlocking the next.
- **Indian Preschool Teacher Voice (`TeacherVoiceEngine`)**:
  - Built-in speech synthesis featuring warm, patient Indian English female narration (`en-IN`) with gentle praise, guided counting, and parent mute toggle.
- **Zero-Dependency Synthesizer (`SoundEngine`)**:
  - 100% offline Web Audio API sound generator creating musical bubble pops, chords, and star chimes without external audio files.
- **Encouraging Non-Penalizing Feedback**:
  - Incorrect choices trigger gentle wobble animations, soft pitch ramps, and encouraging teacher narration with zero penalties.
  - **"💡 Count with Me"** button provides animated guided counting across the entire equation from left to right.
- **100% Static & Serverless**:
  - Runs entirely in modern browsers with no backend, database, or external asset dependencies.
- **Fully Responsive**:
  - Seamlessly adapts across mobile phones, tablets, iPads, Chromebooks, and desktop monitors.

---

## 📁 Project Structure

```text
Tenali Addition Flower II/
├── index.html                        # Primary entry point for GitHub Pages
├── styles.css                        # Complete visual styling & responsive layouts
├── game.js                           # Visual equation logic, audio synth, speech & confetti
├── tenali_mascot.png                 # Authentic Tenali scholar mascot illustration
├── flower_addition_ii_standalone.html # Single-file self-contained bundle
├── .gitignore                        # Standard Git ignore rules
└── README.md                         # Project documentation
```

---

## 🚀 How to Run Locally

Because this is a pure static web app, no build step or package manager is required:

1. **Directly in Browser**: Double-click [`index.html`](index.html) or open it with any modern web browser (Google Chrome, Microsoft Edge, Safari, Mozilla Firefox).
2. **Via Local Server** (Optional):
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.

---

## 🌐 Deploying to GitHub Pages

1. Initialize a Git repository and push this directory to a separate GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tenali Flower Addition II"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** > **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and directory `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your activity will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`
