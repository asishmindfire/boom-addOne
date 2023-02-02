const { Configuration, OpenAIApi } = require("openai");

module.exports = {
  generateText: async (request_data) => {
    console.log("Request data from client side =>", request_data);
    const configuration = new Configuration({
      apiKey: request_data.access_key,
    });
    const openai = new OpenAIApi(configuration);
    if (!configuration.apiKey) {
      return "OpenAI API key not configured, please follow instructions in README.md";
    }
    // const animal = request_data.animal || "";
    // if (animal.trim().length === 0) {
    //   return "Please enter a valid animal";
    // }

    const options = {
      model: "text-davinci-003",
      prompt: "Biography of APJ Abdul kalam ?",
      // suffix: "What can I help you with?",
      // The max token size of both prompt and response is 2048. It may vary in some cases.
      max_tokens: 100,
      // Temperature 0 means deterministic answer, also we can move towards 1 to get close to answer.
      temperature: 0,
      // It will only keep the 80% generated tokens and discard 20% tokens from response.
      // which reduces the chance of the API repeating the same phrase multiple times.
      top_p: 0.8,
      // Number of responses, It is useful when we require multiple perspective for given prompt.
      n: 2,
      // It will generate multiple response as input in real-time, as the user inputs text.
      // This can be useful for applications such as chatbots, text prediction, and autocomplete features.
      stream: false,
      // logprobs: true,
      // echo: true,
      // stop: "Thank you for your time.",
      // presence_penalty: 0.5,
      // frequency_penalty: 0.8,
      // best_of: 3,
      // logit_bias: 2,
      // user: 'my_unique_user_id'
    };

    const stream = false;

    try {
      const result = openai.createCompletion(options);

      let theAnswer = "";
      let count = 1;
      await result.then(async (r) => {
        console.log(`Response from AI =>`, r.data);
        if (stream) {
          theAnswer = r.data.toString();
        } else {
          if (r.data.choices.length > 1) {
            for (let index = 0; index < r.data.choices.length; index++) {
              if (index === 0)
                theAnswer = theAnswer + "Answer " + `${count++}` + "\n\n";
              if (index === r.data.choices.length - 1) {
                theAnswer = theAnswer + r.data.choices[index].text.trim();
              } else {
                theAnswer =
                  theAnswer +
                  r.data.choices[index].text.trim() +
                  "\n\n\n" +
                  "Answer " +
                  `${count++}` +
                  "\n\n";
              }
            }
          } else {
            theAnswer = r.data.choices[0].text.trim();
          }
        }
      });
      return theAnswer;
    } catch (error) {
      if (error.response) {
        console.log(error);
        return error.response.data;
      } else {
        console.error(`Error with OpenAI API request:`, error);
        return "An error occurred during your request.";
      }
    }
  },
};
