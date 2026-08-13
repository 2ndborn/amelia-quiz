# Amelia-Quiz Testing
Visit the deployed site: https://2ndborn.github.io/amelia-quiz/
[Responsive](./readme-assets/zen_responsive.webp)
---

## CONTENTS

* [AUTOMATED TESTING](#automated-testing)

* [W3C Validator](#w3c-validator) for CSS

* ESLint is installed as a JavaScript Validator

* [MANUAL TESTING](#manual-testing)

* [Testing User Stories](#testing-user-stories)

* [Full Testing](#full-testing)

---

## AUTOMATED TESTING

### W3C Validator

[W3C](https://validator.w3.org/) was used to validate the HTML on all pages of the website. It was also used to validate the CSS.

* [Home Page]()
* [Game Page]()
* [Styles.css]()
- - -
### **Performance & Accessibility Testing**

  

This project was evaluated using **Google Lighthouse** to ensure strong performance, accessibility, best practices, and SEO. The site achieved high scores across all categories, confirming that it is fast, accessible, and built following modern web standards.

## MANUAL TESTING

### Testing User Stories

`Navigation`

| Goals | How are they achieved? | Evidence |
| :--- | :--- | :--- |
| I want to see subject options, so I can make an infomed decision of what game to play.| Clicking the subject button rendered the game page. | ![Navbar]() |
| I want the available subjects to be clearly identifiable so that I can quickly choose a quiz.| The subjects are clearly visible on the home page | ![Navbar]() |
| I want visual feedback when hovering or selecting a subject so that I know it is interactive.| Hovering over the subject button changes the color of the icon and the button. | ![Navbar]() |

`Game`

| Goal | How is this achieved | Evidence |
| --- | --- | --- |
|I want to see which question I am currently answering so that I know my progress through the quiz.|The option choosen changes color|![image of the owners bio]()|
|I want to select one answer per question so that I can submit my response.|When the user chooses another answer that answer changes color while the previous one returns to normal|![image of the owners bio]()|
|I want my selected answers to remain selected when moving between questions so that I can review my choices.|If the user moves on to the next question when they return the answer stays checked.|![image of the owners bio]()|
|I want to see my final score when the quiz ends so that I can measure my performance.|Users are shown which questions the got correct/incorrect their score.|![image of the owners bio]()|
|I want a variety of questions to be presented each time I play so that the quiz remains engaging and educational.|Each time a game is played questions as well as the answers are shuffled.|![image of the owners bio]()|

`General`

| Goal | How is this achieved | Evidence |
| --- | --- | --- |
|I want the application to be responsive on mobile, tablet, and desktop devices so that I can use it comfortably on any screen size.|The site has been tested on all device sizes.|![Image of various picture]()|
|I want buttons and interactive controls to remain usable on touch devices so that I can complete quizzes without difficulty.|Site has been tested on touch screen devices|n/a|

- - -

### Full Testing
Full testing was performed on the following devices:

* Laptop:
	* MSI Summit 13 AI+ Evo A2VMTG
	* HP
	* Google Chromebook

* Mobile Devices:
	* iPhone 13 pro
	* Google Pixel 6 Pro
	* Google Pixel 9a
	* Motorola g 06
____
Devices tested the site using the following browsers:

* Google Chrome
* Edge
* Firefox
* Opera
---
### Additional Testing 
Additional testing was taken by friends and family on a variety of devices and screen sizes.

| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
|**`Navigation`**|
| Subject button | When clicked, the game page is rendered. | Clicked the subject button | The game page is rendered.| ✅ |
| Home button (game page)| When clicked, the home page is rendered. | Clicked the home button | The home page was rendered.| ✅ |
| --- | --- | --- | --- | --- |
|**`Game Page`**|
| Next button disabled| The button remains disabled until an answer is selected. |Checked an answer. | The Next button remained disabled until an answer was selected.| ✅ |
| Prev button visibility | When the first question is answered and the user clicks Next, the Prev button becomes visible. |Answered the first quesion and clicked the Next button. | The Prev buttons appeared.| ✅ |
| Answer buttons | Only one answer can be selected at any time.|Selected one answer, then selected another. | The first answer was automatically unchecked.| ✅ |
| Game end | When the user’s score is > 80%, a confetti animation is triggered. |Scored above 80%. | The confetti animation was triggered.| ✅ |
| Prev & Next button change | After the final score is shown, the Prev button changes to `Home` and the Next button changes to `Replay`. |Played the game to completion. | The buttons changed as expected.| ✅ |
| Prev/Home buttons | The home page is rendered when the user clicks the `Home` button. |Clicked the Home button after the final score was shown. | The home page was rendered.| ✅ |
| Next/Replay buttons | The game restarts with the same subject when the user clicks the `Replay` button. |Clicked Replay after the final score was shown. | The game restarted with the same subject.| ✅ |