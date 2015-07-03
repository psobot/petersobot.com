--- 
layout: post
title: The Cost of Waterloo Software Engineering
published: true
image: previews/secalculator.png

---

This past June, I graduated from the University of Waterloo's Software Engineering program. After 5 long and difficult years, I'm extremely proud to say that I'm a Waterloo grad, and very proud of my accomplishments and experiences at the school. Somewhat surprisingly, myself and most of my classmates were able to graduate from a top-tier engineering school with zero debt. (I know this might sound like a sales pitch - stick with me here.)

Waterloo is home to the world's largest cooperative education programs --- meaning that every engineering student is required to take at least 5 internships over the course of their degree. Most take six. This lengthens the duration of the course to five years, and forces us into odd schedules where we alternate between four months of work and four months of school. We get no summer breaks.

One of the most important parts of Waterloo's co-op program is that the school requires each placement be *paid*. Without meeting certain minimum requirements for compensation, a student can't claim academic credit for their internship, and without five internships, they can't graduate. This results in Waterloo co-op students being able to pay their tuition in full (hopefully) each semester. In disciplines like Software Engineering, where demand is at an all-time high and many students are skilled enough to hold their own at Silicon Valley tech giants, many students end up negotiating for higher salaries at their *internships*.

To help visualize this financial situation and aid younger Software Engineering students in planning their future, I decided to create a little tool: the [SE Calculator](http://petersobot.com/secalculator).

![Mathematical! Rhombus!](../../images/body/secalculator.png)

This simple, free, [open-source](https://github.com/psobot/secalculator) in-browser tool allows you to calculate and visualize how much money you'll earn or owe at the end of a five-year Waterloo Software Engineering degree. While it's not rigorous (and **should not be used as a financial advisor**) it has helped me visualize how much money I've earned and spent during my academic career.

By default, the site assumes you're a student that pays average Software Engineering tuition and average Software Engineering fees, earns one scholarship in your first year, and spends each internship working at software companies in Waterloo. The calculator includes a bunch of preset values, taken from personal experience and that of classmates, to simulate what you might make and spend when working in different regions or industries. (For example, the San Francisco Bay Area preset has a ridiculously high housing cost, but a similarly high salary.)

The site also stores your data in the URL string, because -- well, simply -- I wanted to store the data somewhere quick and easy. Bookmark the page once you've plugged in some values and store multiple datasets in your bookmarks bar.

If you're a Software Engineering student (or will soon be one), I hope you find the tool useful to you. If you're a student in some other Waterloo Engineering discipline, or in Computer Science, hopefully most of the fields still apply to you and you might get some utility out of the tool as well. 

If you're interested in customizing the tool - to add new presets, to adapt it to your own academic situation, or just to fix bugs - please feel free to [fork it on GitHub](https://github.com/psobot/secalculator). The tool runs almost entirely in-browser with [Angular.js](http://angularjs.org) and uses [Gulp](http://gulpjs.com) as a build tool. Happy hacking!