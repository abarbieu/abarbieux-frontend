# Portfolio Website Front End Interface

The front end of a fully fledged portfolio website built with ReactJS, React-Bootstrap, Typescript, and NodeJS. Includes scripts and components that automatically generate content from photo folders, JSON files, and the back end API.

### `Websites:`

[abarbieux.com](https://www.abarbieux.com) || [barbieux.dev](https://barbieux.dev) Both currently point to the same source

---

## Contents:

1. [Related Repos](#Related-Repos)
2. [Features and Components](#Features-and-Components)
   1. [Tree Menu](#Tree-Menu)
   2. [Photo Gallery](#Photo-Gallery)
   3. [Contact Form](#Contact-Form)
   4. [About Me](#About-Me)
   5. [Notes Page](#Notes-Page)
3. [Additional Info](#additional-info)
   1. [Reference Guides](#Reference-Guides)
   2. [ReactJS](#React-JS)

---

## Related Repos

- #### `Back End:`

  - [portfolio-backend](https://github.com/abarbieu/portfolio-backend) ~ A backend interface hosting RESTful APIs and logging middleware, built with NodeJS, Express, and

- #### `Production:`

  - [portfolio-production](https://github.com/abarbieu/portfolio-production) ~ Where optimized frontend and backend projects are combined and served with different routes and middleware.

## Features and Components:

- #### [`Dynamically Animated 'Tree Menu':`](#Tree-Menu)

  - Automatically generates an animated menu system of links, routes, and children based on a provided JSON file

- #### [`Full Photo Gallery:`](#Photo-Gallery)

  - Creates a stylized photogallery with dynamically sized layouts, full modal carousel viewer with fullscreen capability. Includes a script to generate a catalog JSON file with automatically shrinked thumbnails and src sets

- #### [`API Backed Contact Form:`](#Contact-Form)

  - Launches a Modal displaying a form to send an Email to me, which requests my API with potential Files and Content.

- #### [`About Me Page:`](#About-Me)

  - Renders an about me page with parallax banners and card links to routes. Automatically scaled using React-Bootstrap's flexbox layout system.

- #### [`Editable, Expandable, and Archiveable, Notes Page:`](#Notes-Page)

  - Renders fully editable and expandable notes and archive from a database, ordered by severity and date. Contains a form for note title and content as well as a severity slider and archive functionality.

---

## Tree Menu

---

#### `Usage:`

Automatically generated from a JSON file provided in `project-dir/src/resources/` in the form:

```JSON
[
  {
    "root": {
      "title": "Enter",
      "children": [ "childa", "childb" ]
    }
  },
  {
    "childa": {
      "title": "Child A",
      "background": "https://imgur.com/c1.png",
      "children": [ "childa1" ]
    },
    "childa": {
      "title": "Child B",
      "background": "icons/pic.png",
      "placeholder": "icons/thumbnail.png",
      "children": [ "childb1" ]
    },
  },
  {
    "childa1": {
      "title": "Child A One",
      "background": "pic.png",
      "placeholder": "thumb.png",
      "link": "https://github.com/abarbieu/portfolio-frontend"
    },
    "childb1": {
      "title": "Child B One",
      "background": "icons/postgres.png",
      "placeholder": "icons/postgres_thumb_.png",
      "route": "/childb1-page/
    },
  },
]
```

### `Purpose:`

For deep/tall tree structures that don't do well in traditional list menus. Largely just for animation and beautification.

#### `Todos:`

1. Scale and modify paths with screen dimensions.
2. Draw lines between nodes.

---

## Photo Gallery

---

### `Features:`

Auto-scaled and layed out using _React Image Gallery_. Lazy loaded with _React Lazy Load Image_. When an image is clicked it is expanded into a Carousel managed by _React Images Viewer_

JSON manifest and compressed thumbnail images automatically generated from imageScraper.js script using _GraphicksMagick_

### `Purpose:`

To simplify the process of adding photos to the website, and generate pretty looking pages to display photos.

### `Todos:`

1. Create SrcSet for each image
2. Possibly conver to .webp format
3. Manage lazy load to stop loading images off screen

---

## Contact Form

---

### `Features:`

Launches a fully stylized modal form at any website state which contains a form with validity checking and an alerts/errors stream.

Allows for up to 512MB of files to be sent along with request.

### `Purpose:`

To allow users of the profile website to contact me immediately with no extra steps or unnecessary information.

### `Todos:`

1. Organize navbar dropdown to be center aligned on mobile, (much harder than it should be)

---

## About Me

---

### `Features:`

Renders an about me page with parallax banners and card links to routes. Automatically scaled using React-Bootstrap's flexbox layout system.

---

## Notes Page

---

### `Features:`

Automatically layed out, flex-box page of expandable notes. Each note allows for an editing state, allowing title and content changes, a severity slider, and an archive button

A manageable archive holding notes before permanent deletion.

### `Purpose:`

To display todos and ideas in an ordered manner, presenting information based on how important it might be.

I was not content with any other note app that I tried, so having full customizeability is the intent

### `Todos:`

1. Add tabs for todos vs ideas vs etc...
2. Add due dates and notifications
3. Handle formatting better, maybe an html or markdown formatter inside
4. Check boxes and lists etc (part of #3)
5. Manage width attribute to stop layout changes on expand

---

---

# Additional info

## Reference Guides

[React Bootstrap docs](https://react-bootstrap.netlify.app/getting-started/introduction/)

[Styled Components](https://styled-components.com/docs)

[Gallery Grid](https://www.npmjs.com/package/react-photo-gallery)

[Image Gallery (Carousel)](https://www.npmjs.com/package/react-image-gallery)

[Graphics Magick](https://aheckmann.github.io/gm/docs.html)

## React JS

<details>
 <summary>Reactjs details</summary>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

</details>
