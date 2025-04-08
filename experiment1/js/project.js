// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
  opener: ["Greeting", "Sup", "Hello there", "Salutations", "Brodigy", "My dude", "Top of the morning", "Howdy", "Rise and shine", "Wakey Wakey", "I'm in your wall", "Sleep with one eye open", "$opener and $opener"],
  firstName: ["", "Pretty little guy", "Sweet Snookems", "Big ol' thang", "Blah Blah Blah", "Wes", "Freaky", "Deez", "Joe"],
  nameTitle: ["", "The First", "The Second", "The third", "The Annihilator", "The Dookieman", "The Blind Monk that is somehow reading this", "The Monster", "The I'm running out of ideas placeholder", "$nameTitle-$nameTitle"],
  purpose: ["to inform you that we are winning too hard Mr.President", "talk about our lord and savior", "because I was bored", "to mess withcha", "cuz why not", "because I miss you", "because I miss us", "because I'm trynna sell some products"],
  relative: ["mother", "father", "brother", "sister", "second cousin of your $relative", "dog", "cat", "$relative's $relative", "$relative's $relative", "$relative's $relative"],
  someHorribleThing: ["met the boogeyman and let's just say it didn't end too good", "was hitting the whip and nae-nae so hard that they blew their back out", "slipped on a banana peel while go karting down the rainbow road", "was eating too much and passed out", "was hospitalized due to a giant $object"],
  object:["nothing", "anything within your line-of-sight", "diet Pepsi", "Pokemon cards", "yummy in my tummy", "balls", "figurines", "coins", "fists", "potatoes", "cars", "inflatable monkeymen", "..uh what was it again? $object maybe?"],
  amount: ["however much you want of", "two", "three", "four", "two hundred and sixty six", "one hundred and fourty seven", "so many", "too many", "an unsatisfying number of", "barely any", "an unspecified amount of", "surely a satisfactory number of", "a large amount that would blow my mind of"],
  action:["quickly", "slowly", "eagerly", "excitingly", "promptly", "happily", "as soon as you get this message", "as slow as you'd like", "$action and $action"],
  solution: ["making the cure", "dropshipping and becoming so rich I'm already smiling", "saving them", "I don't know really, I'm not a doctor", "hmmmmmmmmmmmmmmmmmmmmmmm I'm thinking", "what was it again that I was suppose to do? whatever"],
};

const template = `$opener, $firstName $nameTitle!

My name is $firstName $nameTitle, and I am writing this $purpose and that your $relative $someHorribleThing.
In order to save them, you must send me $amount $object, so that I can begin the process of $solution!
Please reply $action, they might not make it!
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);
}

/* global clicker */
$("#clicker").click(generate);

generate();

}

// let's get this party started - uncomment me
main();