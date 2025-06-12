const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const reviewCode = async (userCode) => {
    const prompt = `
You are a highly experienced Senior Software Engineer and Code Reviewer.

Thoroughly analyze and review the following code snippet with a professional and detailed approach. Your review must strictly cover the following points in a clear, structured format:

1. **Programming Language Detection:**  
   Detect and mention the likely programming language(s) used in the code snippet.

2. **Code Purpose Analysis:**  
   Based on the code, try to infer and briefly describe what this code is intended to do or achieve.

3. **Potential Bugs or Logical Errors:**  
   Identify and list any possible bugs, logical flaws, or incorrect implementations.

4. **Performance Optimizations:**  
   Suggest improvements to enhance performance, if applicable.

5. **Code Quality & Clean Code Practices:**  
   Highlight any code smells, bad practices, violations of **SOLID principles**, or clean code guidelines.

6. **Readability, Maintainability, Scalability:**  
   Provide suggestions to improve the code’s clarity, modularity, scalability, and ease of maintenance.

7. **Security Vulnerabilities:**  
   Detect and report any security risks or vulnerabilities such as **XSS, SQL Injection, CSRF, Insecure Dependencies**, etc.

8. **Time and Space Complexity Analysis (if applicable):**  
   Analyze and mention the Big O **time and space complexity** of the main logic or algorithms present in the code.

9. **Design Patterns & Best Practices:**  
   Comment on the presence (or absence) of appropriate **design patterns, architectural decisions**, or best practices.

10. **Refactored Code / Pseudocode (if required):**  
    Provide a cleaned-up, optimized, or more maintainable version of the code or its pseudocode equivalent for clarity.

Ensure that your review is concise, to-the-point, professional, and in the tone of a **real peer code review done in a software development company**.  
Do not assume context unless obvious — stick to what can be reasonably inferred from the code snippet.

Here is the code snippet for review:

${userCode}


    `;

    const response = await axios.post(GROQ_URL, {
        model: "llama3-70b-8192",
        messages: [
            { role: "system", content: "You are a professional code reviewer." },
            { role: "user", content: prompt }
        ],
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }, {
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
         timeout: 10000 // wait for 10 seconds
    });

    return response.data.choices[0].message.content;
};

module.exports = { reviewCode };
