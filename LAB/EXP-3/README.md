# Experiment 3 — Design and Build a Responsive Web Page

**Course:** Backend Development Lab · **Course Outcome:** CO2  
**Student:** Divyansh Panwar · **SAP ID:** 590018990 · UPES Dehradun

## 1. Aim

To build a responsive web page using semantic HTML and CSS Grid, Flexbox, fluid sizing and media queries.

## 2. Objectives

- Understand responsive web design and the viewport.
- Create a semantic page structure.
- Use Grid for a multi-column feature layout.
- Use Flexbox for navigation.
- Apply media queries for desktop, tablet and mobile layouts.
- Add keyboard focus states and reduced-motion support.

## 3. Tools and Environment

Visual Studio Code, a modern browser, HTML5 and CSS3. The experiment uses `index.html` and `style.css` and does not require a framework or JavaScript.

To serve the folder locally, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 4. Theory

Responsive web design is an approach in which a page adapts to the screen and viewport available to the visitor. A responsive page uses flexible dimensions and layouts rather than assuming one fixed desktop size.

CSS Grid arranges content in rows and columns. Flexbox aligns items along one axis and is useful for navigation. Media queries apply different CSS when a viewport condition matches. The `clamp()` function lets a value scale between a minimum and maximum.

## 5. Procedure

1. Add the viewport meta tag.
2. Create semantic header, navigation, main and footer elements.
3. Build feature cards with CSS Grid.
4. Use Flexbox for the navigation links.
5. Add breakpoints to change the card layout from four columns to two and then one.
6. Resize the browser and inspect the page at different widths.

## 6. Output and Observation

The feature cards use four columns on wide screens, two columns on medium screens and one column on narrow screens. The masthead and explanatory section also stack vertically on smaller viewports.

## 7. Result

A responsive web page was created using HTML5 and CSS3.

## 8. Conclusion

Flexible layouts and media queries allow one page to work across different screen sizes. The experiment demonstrates how Grid, Flexbox and fluid sizing can be combined without a CSS framework.
