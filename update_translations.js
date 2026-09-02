const fs = require('fs');

const en = {
  "HomePage": {
    "title": "Escape the ordinary. Discover Ethiopia.",
    "subtitle": "Three remarkable destinations. Carefully curated weekend journeys designed to take you further from routine and closer to the places worth remembering.",
    "exploreTrips": "Explore trips",
    "discoverDestinations": "Discover destinations"
  },
  "Navigation": {
    "destinations": "Destinations",
    "trips": "Trips",
    "whyUs": "Why Us",
    "faq": "FAQ",
    "exploreTrips": "Explore Trips"
  },
  "Destinations": {
    "title": "Discover your escape.",
    "subtitle": "From cool highland landscapes to warm mineral springs and refined village retreats, every destination has a different rhythm.",
    "allDestinations": "All Destinations",
    "explore": "Explore"
  },
  "Trips": {
    "title": "Your next adventure.",
    "subtitle": "Browse our curated list of upcoming weekend escapes.",
    "allTrips": "Upcoming Trips",
    "bookNow": "Book now"
  },
  "About": {
    "title": "Why Shekla Tour and Travels",
    "subtitle": "About Us"
  }
};

const am = {
  "HomePage": {
    "title": "ከተለመደው ውጡ። ኢትዮጵያን ያግኙ።",
    "subtitle": "ሶስት አስደናቂ መዳረሻዎች። ከተለመደው የዕለት ተዕለት ኑሮ ርቀው የማይረሱ ቦታዎችን እንዲያዩ የተዘጋጁ ልዩ የሳምንት መጨረሻ ጉዞዎች።",
    "exploreTrips": "ጉዞዎችን ያስሱ",
    "discoverDestinations": "መዳረሻዎችን ያግኙ"
  },
  "Navigation": {
    "destinations": "መዳረሻዎች",
    "trips": "ጉዞዎች",
    "whyUs": "ስለ እኛ",
    "faq": "ጥያቄዎች",
    "exploreTrips": "ጉዞዎችን ያስሱ"
  },
  "Destinations": {
    "title": "ማምለጫዎን ያግኙ።",
    "subtitle": "ከቀዝቃዛው ተራራማ መልክዓ ምድር እስከ ሞቃታማው የፍል ውሃ እና የባህል መንደሮች ድረስ፣ እያንዳንዱ መዳረሻ የራሱ የሆነ የተለየ ስሜት አለው።",
    "allDestinations": "ሁሉም መዳረሻዎች",
    "explore": "ያስሱ"
  },
  "Trips": {
    "title": "ቀጣዩ ጀብዱዎ።",
    "subtitle": "በጥንቃቄ ከተዘጋጁት መጪ የሳምንት መጨረሻ ጉዞዎቻችን ውስጥ ይምረጡ።",
    "allTrips": "መጪ ጉዞዎች",
    "bookNow": "አሁን ይመዝገቡ"
  },
  "About": {
    "title": "ለምን ሸክላ ቱር እና ትራቭልስ?",
    "subtitle": "ስለ እኛ"
  }
};

fs.writeFileSync('./messages/en.json', JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync('./messages/am.json', JSON.stringify(am, null, 2), 'utf8');
console.log('Translations updated successfully.');
