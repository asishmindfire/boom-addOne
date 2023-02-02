const testPackage = require("test-package");

console.log("Test successful.");

async function test() {
  const respText = await testPackage.generateText({
    access_key: "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",
    engine: "text-davinci-002",
    prompt: "What is the best way to spend a weekend?",
    suffix: "What can I help you with?",
    max_tokens: 2048,
    temperature: 0,
    top_p: 0.8,
    n: 1,
    stream: true,
    logprobs: true,
    echo: true,
    stop: "Thank you for your time.",
    presence_penalty: 0.5,
    frequency_penalty: 0.8,
    best_of: 3,
    logit_bias: 2,
    user: 'my_unique_user_id'
  });
  console.log(`Package response =>`, respText);
  return respText;
}

test();
