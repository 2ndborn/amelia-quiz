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

### Click Sound Not Playing on Navigation

#### Issue Summary

The click sound effect stopped playing when users clicked on subject links. Although the audio file existed and loaded correctly, the sound never played during navigation.

#### Root Cause

Browsers block or cancel audio playback if a page begins navigating immediately after a click event. Because each subject link (`<a href="...">`) triggered an instant page load, the audio buffer never had time to start, resulting in silent failures with no console errors.

#### Fix Implemented

Navigation is now delayed briefly to allow the audio to begin playing before the page unloads.

#### Solution Code

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

#### Outcome

-   Click sound now plays consistently across all pages.
    
-   Navigation still works smoothly with no visual delay.
    
-   Audio playback is no longer cancelled by browser autoplay restrictions.