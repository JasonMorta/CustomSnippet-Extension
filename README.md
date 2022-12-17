
# Snips v0.1.1-alpha
Create and save your own snippets in the browser local storage.

## Installation

```bash
1. Download the repo to your local machine.
2. Unzip the repo content. 
3. In your chrome browser go to option > More tools > Extensions.
4. Select "Load Unpacked", and navigate to the unzipped repo folder > Select Folder.
5. Select the radio button to enable the extension. Done! 
```
#### When on the review page, the button will automatically appear.
    
## Features / usage

- Add your own text. 
- Stored in local storage.
- Each snippet can be copied, deleted and moved up the list. 
- Double click icon to delete item.
- Add custom HTML/CSS the following way:
```bash
All text are palaced inside the <p> tag, adding header(H1) tags will not work.
Instead do this:

<b style='color: red'>Heading</b><br>

Adding <br> will add a line break, placing the heading above your text.
⚠ only use single quotes inside elements.
```

- For quick access to extensions, create a shortcut: Inside extensions tab, select the menu from the top-left corner > keyboard shortcuts. I found "Ctrl + S" to work very well.

## Tech Stack

**Client:** HTML/CSS, JavaScript, Chrome API


## Screenshots

![App Screenshot](https://github.com/JasonMorta/CustomSnippet-Extension/blob/main/Screenshot.png)


## License

[MIT](https://choosealicense.com/licenses/mit/)

