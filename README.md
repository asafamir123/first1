# AmazonEcho_HelloWorld

This is a short and solid example code to create your first Amazon Alexa skill that
lets your Echo Device responds with Hello World or Hello Name where Name is an input Name

## Getting Started

You need to generate 2 Accounts - 1st on developers.amazon.com and 2nd on aws.amazon.com.
### Prerequisites

What you need to know and what should be installed on your system

```
- basic knowledge of network systems
- deeper skills in javascript
- git is installed on your machine
```

### Installing

Just follow these steps and get the example running on your Amazon Echo Device or in the test environment.

```
Create an AWS Lambda node.js function with the content of index.js and 
copy the functions ARN Path
```

In Amazon Developers Tools do the following

```
- Create a new Alexa Skill and set it to your prefered language (we use german now).
- Setup the Alexa Skill with the intent_shema.json as your intent schema and use
  sample_utterances.conf as the starting point for your utterances
```

## Running the tests

You can either test your skill by using your echo devices 
**It needs to use the same Account that you use for developers.amazon.com**

You also can use the testing tool inside Amazon Developers which shows you a complete json response.



## Authors

* **Robert Keller** - *Initial work* - [ProgrammersLog](http://programmers-log.net)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details


