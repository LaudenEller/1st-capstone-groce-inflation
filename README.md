# Groce' Inflation

Groce' Inflation is a website for tracking the price of groceries and calculating inflation over time.

<!-- INSERT LINK TO DEPLOYED APP HERE -->

A live version is deployed [here](ADD A LINK HERE)!  

<!--  ^^^ HERE ^^^ -->

In this document:
- [Motivation](#motivation-for-this-project)
- [How it works](#how-groce'-inflation-works)
- [How it was developed](#how-groce'inflation-was-developed)
- [How to install and run it yourself](#how-to-install-and-run-this-project)
- [Lessons Learned](#difficultieslessons-learned)

# Motivation For This Project

Groce' Inflation was created as my first big project in the Full Time Web Development Boot Camp, Cohort #54, at Nashville Software School. The Capstone Project is the conclusion of the front-end (Javascript/HTML/CSS) portion of the course and I wanted to make a website that utilized my awareness of insane grocery price fluctuations over that last few years and make a hobby of tracking small-scale inflation data for the stores where I shop.

[Back to Top](#Groce'-Inflation)

# How Groce' Inflation Works

Users can create a profile using just a name and email (the email is not used by the site other than log in so feel free to use a fake!). 

Once logged in, users can manage a list of products they buy from different vendors and log purchases for those products, then those purchases are displayed on a chart that graphs price and dates on each purchase of a given product, allowing the user to observe the change over time.

<!-- INSERT GIFS OF APP IN ACTION HERE -->

<!-- <p align="center">
  <img src="" width="" height="" />
 </p>

INSERT DESCRIPTION OF USING THE APP HERE

<p align="center">
  <img src="/HuntOwner.gif" width="372" height="310" />
</p>

INSERT ANOTHER DESCRIPTION OF USING THE APP HERE

<!-- ^^^HERE^^^ -->

[Back to Top](#groce'-inflation)

# How Groce' Inflation Was Developed

I developed this project over the course of a couple weeks. The first week, I struggled against MUI, React Bootstrap, Reactstrap and AnimateCSS which are all external CSS libraries that each in their own turn confused matters a great deal, but the process thoroughly retaught me CSS fundamentals and I managed to squeak out an MVP by the deadline. Over the second week, I was able to add additional functionality including incorporating ChartJS with a Json API, and redoing the wire-frames I had built so I then used the better planned UI to redesign and rebuild my component locations and behaviors.

<!-- INSERT TECH STACK ICONS HERE -->

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<!--  ^^^ HERE ^^^ -->

[Back to Top](#groce'-inflation)

# How to install and run this project

If you would like to play around with this project, you can follow these instructions to download it and test it out on your local machine:

- Clone this repo
- In the database directory run `json-server database.json -p 8088 -w`
- Open a different terminal window or tab and navigate to the project directory
- In the project directory run `npm start`
- In a browser, open `localhost:3000` and you should see the app running.



[Back to Top](#groce'-inflation)

# Difficulties/Lessons Learned  

The difficulties I ran into on this project had mostly to do with mismatching documentation with tutorials and other online resources. All of the React-ChartJS-2 documentation was written in Tsx, and all the tutorials I could find were using an outdated version of ChartJS so interpreting each resource for my use case took up massive amounts of time and I ended up writing much more code than I used. I learned that taking time to think about your plan of attack in order to utilize resources is a necessary step before copy-pasting any code at all. Committing too early to an idea or tech structure creates a lot of unnecessary constraints and extra labor if you then have to redo it or when it doesn't work with the dataflow you later require.

[Back to Top](#groce'-inflation)