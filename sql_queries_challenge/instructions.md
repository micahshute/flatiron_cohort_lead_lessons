# Congratulations, Agent


You have been chosen to go undercover to track the most dangerous criminals in the world.

In order for us to bust these underground rings, we need all the data we can get. That is where you come in. 

---

We have a little information for you, but we need to get organized and know what we are up against before we start breaking down doors. We need YOU to collect and store data on who committed a crime AND what organization they are a part of. Once we know the power dynamics between these groups, we can start playing them against each other which will make taking them down a lot easier.

In your terminal, create a sqlite3 database to hold all of this information.

We need to keep track of crimes, criminals, and organizations. 

Crimes will have locations, descriptions, total value of stolen goods, and casualty count. Crimes should belong to a criminal.

Criminals will have a name, an alias, an address, and should belong to an crime organization.

An organization should have a name and a motto, and it should have many criminals (and many crimes through criminals)


Once you have the database set up, start gathering data. Here is what we know so far:

---

**Known Crimes**

excessive awesomeness, 123 main st, 0 dollars stolen, casulaty count: 0, committed by micah

---

**Known Criminals**

micah, aka iron man, 123 main st, is a part of spectre

---

**Known Organizations**

spectre, "we bad"

---

You are in charge of adding more information! Try using the Faker Gem in IRB if you want to get familiartiy with it!


Once you have gathered your data, now you need to teach us non-techies how to access your work. I need to be able to:

- Get a list of all criminals and their associated organization
- Get a list of all crimes a criminal committed
- Get a list of all crimes associated with one organization
- Get a list of all criminals associated with one organization
- Get a count of all criminals in an organization
- Get a count of all crimes committed by a criminal
- Get a count of all crimes committed by an organization
- Get a count of all criminals in an organizaiton and the total number of crimes commited by the organization

Deliver your report by the end of the study group!