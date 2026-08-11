
# Amelia-Quiz
## Mission statement
This website is to support my daughters revision for GCSE's in addition to her schools tuition.
## User Stories
### `Navigation`
* I want to navigate between the main game options and the home screen, so I know where I am going.
* I want to know which subject I have selected so that I know which quiz I am taking.
___
### `Home`
* I want to see subject options, so I can make an infomed decision of what game to play
* I want the available subjects to be clearly identifiable so that I can quickly choose a quiz.
* I want visual feedback when hovering or selecting a subject so that I know it is interactive.
___

### `Game`

* I want to see which question I am currently answering so that I know my progress through the quiz.
* I want to select one answer per question so that I can submit my response.
* I want my selected answers to remain selected when moving between questions so that I can review my choices.
* I want to see my final score when the quiz ends so that I can measure my performance.
* I want a variety of questions to be presented each time I play so that the quiz remains engaging and educational.
___

### `General`

* I want the application to be responsive on mobile, tablet, and desktop devices so that I can use it comfortably on any screen size.
* I want buttons and interactive controls to remain usable on touch devices so that I can complete quizzes without difficulty.

## Future Features

`Timed Mode`

-   As a user, I want to challenge myself with a countdown timer so that I can test my knowledge under pressure.

`Settings`

-   As a user, I want to turn sound effects on or off so that I can customise my experience.
-   As a user, I want to choose the number of questions in a quiz so that I can play shorter or longer games.

## Colour & Typography

### `Colour`

||Fonts|CTA Buttons|Shadow|Body|
|-|-|-|-|-|
|Carbon black - #181818|-|-|-|✅|
|Indigo Ink - #2a0057|✅|-|✅|✅|
|Indigo Velvet - #5c2581|✅|-|✅|-|
|Shocking Pink - #e018b5|-|-|✅|-|
|Alice Blue - #f0f8ff|✅|✅||-|

![Colour Scheme](./readme-assets/zen_colors.webp)

### `Fonts`

Roboto

## Wireframes

| Home | About me | Portfolio |

|---|---|---|

|![Home](./docs/assets/home.webp)|![About](./docs/assets/about.webp)|![Portfolio](./docs/assets/portfolio.webp)|

## Technologies

### `Resources`

* HTML

* CSS

* Javascript

* VSCode
* [JSON Converter - GeeksforGeeks](https://www.geeksforgeeks.org/utilities/csv-to-json-converter/)
* [Font Awesome](https://fontawesome.com/icons)

* Microsoft Copilot

* [Google Fonts](https://fonts.google.com/)

* [JPG Converter | CloudConvert](https://cloudconvert.com/jpg-converter)

* [Min-Max-Value Interpolation](https://min-max-calculator.9elements.com/?16,24,320,1200)

* [CSS Gradient Generator - W3Schools](https://www.w3schools.com/tools/tool_css_gradient.php#gsc.tab=0&gsc.q=preserve%203d)

* [The W3C Markup Validation Service](https://validator.w3.org/)

* [JSHint, a JavaScript Code Quality Tool](https://jshint.com/)
* [Pixabay](https://pixabay.com/sound-effects/)

## Credits
* Sound Effect by <a href="https://pixabay.com/users/matthewvakaliuk73627-48347364/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=290204">Matthew Vakalyuk</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=290204">Pixabay</a>
* Sound Effect by <a href="https://pixabay.com/users/ksjsbwuil-50402086/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=513897">ksjsbwuil</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=513897">Pixabay</a>
* Sound Effect by <a href="https://pixabay.com/users/dragon-studio-38165424/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=406644">DRAGON-STUDIO</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=406644">Pixabay</a>

## Fixed bugs

### Hiding the prev button

**Issue:** The `Prev` button was animating on the initial quiz render even though it should start hidden.

**Cause:** The `.hidden` state was being applied after the element had already been rendered, causing the CSS transition to run on the first call to `update()`.

**Fix:** Initialize `prvWrap` with the `.hidden` class before the first render (or disable transitions until after the initial render). This ensures the button starts hidden without animation and only animates when transitioning between quiz questions.

**Result:** The `Prev` button now:

-   Starts hidden on the first question.
-   Does not animate on initial page load.
-   Smoothly animates in when moving beyond the first question.
-   Smoothly animates out when returning to the first question.

### Long Option Text Would Not Wrap Correctly

**Issue:** Long answer text could overflow or cause layout issues because the option text was being rendered as a plain text node inside the `<label>`.

**Cause:** The option text was appended directly to the label:

label.append(input, `${opt}`);

Plain text nodes cannot be targeted with CSS, making it difficult to control wrapping behavior within the flex layout.

**Fix:** Wrapped the option text in a `<span>` and applied flexbox wrapping styles.
```
const span = document.createElement("span");  

span.textContent = opt;  
label.append(input, span);

.options label span {  
	flex: 1;  
	min-width: 0;  
	overflow-wrap: break-word;  
}
```
**Result:**

-   Long answer text now wraps onto multiple lines.
-   Radio buttons remain aligned and maintain a consistent size.
-   Option layouts remain stable regardless of answer length.

----------

### Previous Answers Were Lost When Navigating Back

**Issue:** When users clicked the **Previous** button, their previously selected answer was no longer shown, and the **Next** button became disabled again.

**Cause:** Answers were being stored in the `userAnswers` array, but `update()` was not restoring the saved selection when re-rendering a question.

**Fix:** Added logic to check for a stored answer and restore the selected radio button during rendering.
```
if (userAnswers[index] === i) {  
	input.checked = true;  
	nxt.disabled = false;  
}
```

**Result:**

-   Previously selected answers are preserved when navigating backward.
-   The user's selection remains visible.
-   The **Next** button stays enabled when a saved answer exists.
-   Navigation now behaves consistently across all questions.

### Convert Quiz Answers from Indexes to Strings

#### Problem

Originally, each question stored the correct answer as an index:
```
{  
	question: "What is the capital of Italy?",  
	options: ["Naples", "Turin", "Milan", "Rome"],  
	answer: 3  
}
```
This worked while the answers stayed in the same order, but caused problems when answer options were shuffled.

Example:
```
["Rome", "Milan", "Naples", "Turin"]
```
Now the correct answer is at index `0`, not `3`.

As a result, answer validation would return incorrect results.

----------

#### Solution

Store the answer as the actual answer text instead of an index.
```
{  
	question: "What is the capital of Italy?",  
	options: ["Naples", "Turin", "Milan", "Rome"], 
	answer: "Rome" 
}
```
This means the position of the correct answer no longer matters.

----------

#### Changes Made

##### 1. Updated JSON Structure

Before:
```
answer: 3
```
After:
```
answer: "Rome"
```
----------

##### 2. Store Selected Answer Text

Before:
```
userAnswers[index] = i;
```
This stored the selected option index.

After:
```
userAnswers[index] = opt;
```
This stores the selected answer text.

Example:
```
userAnswers[0] = "Rome";
```
----------

##### 3. Restore Previous Answers

Before:
```
if (userAnswers[index] === i)
```
After:
```
if (userAnswers[index] === opt)
```
Since `userAnswers` now contains answer text, the selected option must be compared against the option text.

----------

##### 4. Score Calculation

The scoring logic became simpler:
```
const correct = userAnswers[i] === question.answer;
```
Example:
```
"Rome" === "Rome"
```
returns:
```
true
```
regardless of where `"Rome"` appears in the shuffled options array.

----------

#### Result

Benefits of the change:

-   Answer options can be shuffled safely.
-   Correct answers are no longer tied to array positions.
-   Scoring logic is simpler.
-   Adding questions to JSON is easier because you don't have to work out answer indexes.
-   Future subjects can use the same structure.

Absolutely — here’s a clean, professional **bug fix write‑up** you can drop straight into your README, commit message, or project documentation.

### **Bug Fix: Click Sound Not Playing on Navigation**

### **Issue Summary**

The click sound effect stopped playing when users clicked on subject links. Although the audio file existed and loaded correctly, the sound never played during navigation.

### **Root Cause**

Browsers block or cancel audio playback if a page begins navigating immediately after a click event. Because each subject link (`<a href="...">`) triggered an instant page load, the audio buffer never had time to start, resulting in silent failures with no console errors.

### **Fix Implemented**

Navigation is now delayed briefly to allow the audio to begin playing before the page unloads.

### **Solution Code**

js

```
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent instant navigation

    clickSound.currentTime = 0;
    clickSound.play();  // play the click sound

    // allow audio to start before navigating
    setTimeout(() => {
      window.location.href = link.href;
    }, 120); // 120ms delay ensures reliable playback
  });
});
```

### **Outcome**

-   Click sound now plays consistently across all pages.
    
-   Navigation still works smoothly with no visual delay.
    
-   Audio playback is no longer cancelled by browser autoplay restrictions.

## TESTING

Please click [here](../egbert/TESTING.md) to view application testing.

## LOCAL DEVELOPMENT

### Clone Repository

1. Login/Sign up to [GitHub](https://github.com/)

2. Go to the project repository [GitHub - 2ndborn/amelia-quiz · GitHub](https://github.com/2ndborn/amelia-quiz)

3. Click on the green code button, select whether you would like to clone with **HTTPS**, SSH or GitHub CLI and copy the link shown.

4. Open the terminal and type the following command in the terminal: <div style="background:#f6f8fa; padding:1em; border-radius:6px;"><pre><code>python -m http.server
</code></pre>
</div>

5. You should see the following: <div  style="background:#f6f8fa; padding:1em; border-radius:6px;"><pre><code>➜ Local: http://localhost:8000/
*Click the Local: link to open the browswer*
</code></pre>
</div>

## Deployment

GitHub is used to host the repository.

#### 1. Go to the project repository [GitHub - 2ndborn/amelia-quiz · GitHub](https://github.com/2ndborn/amelia-quiz)
#### 2. Go to settings 
3. Under **code, planning, and automation** click on `Pages`.
4.  Under **Build and deployment >Branch**  change `None` to `Main`, the press `Save`.
5. You should see the live site address https://2ndborn.github.io/amelia-quiz/.