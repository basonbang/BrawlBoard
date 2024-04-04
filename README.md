# Web Development Project 5 - Brawl Board

Submitted by: Jason Tang

This web app: Displays brawler stats and allows user to search for individual brawlers / apply filters for game modes.

Time spent: 15-20 hours spent in total

## Required Features

The following **required** functionality is completed:

- [ X ] **The list displays a list of data fetched using an API call**
- [ X ] **Data uses the useEffect React hook and async/await syntax**
- [ X ] **The app dashboard includes at least three summary statistics about the data such as**
  - [ X ] Total # of brawlers, current selected game mode/event, total # of active game modes on the live server
- [ X ] **A search bar allows the user to search for an item in the fetched data**
- [ X ] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**

The following **optional** features are implemented:

- [ X ] Multiple filters can be applied simultaneously
- [ X ] Filters use different input types such as a text input, a selection, or a slider
- [ X ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ X ] Allow user to click a brawler row to open up more details about a brawler's abilities and stats on active game modes. 

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='project5.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif 
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.
- The response fetched from the API had an overwhelming amount of data, so I had to carefully extract the relevant data into my state variables through useEffect.
- Since I called 2 different API routes, I had to create another state variable that combined data from both routes together. (This was immensely useful in later functions)
- Styling was a big challenge, as my data was not lining up together. Through inspiration from the sample project, I found the table styles to be the key solution.
- I was initially going to have a submit form to get the rows that matched the user's input and selection from the dropdown menu, but it wasn't as smooth as seeing the data dynamically update as the user filters things out. Implementing that required using the filter() method and a conditional statement based on the user input.
- Making the "Win Rate" column update as the user selects an event from the dropdown menu required me to lift state up to my App component and have additional checks before rendering a Row to ensure that the correct game mode stats were displayed.
- I had a bug where my Brawler Modal wasn't closing when the user clicked the close button.
- Displaying all the win & use rates for every game mode gave me bugs at first since they were stored in an object and you can't map through them in React. I had to convert it into an array and then call the indices in my JSX to get them to display properly.


## License

    Copyright [2024] [Jason Tang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
