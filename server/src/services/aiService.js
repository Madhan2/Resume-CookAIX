const groq = require('../config/groq');

const generateResumeContent = async (resumeData) => {
  const model = process.env.GROQ_MODEL || 'llama3-70b-8192';

  const systemPrompt = `You are an expert professional resume writer. Your task is to take the user's raw resume information and improve it, making it concise, professional, ATS-friendly, achievement-oriented, and grammatically correct.
DO NOT fabricate or invent facts, qualifications, degrees, companies, or skills that the user did not provide.
Improve the wording, expand on bullet points intelligently using industry-standard verbs, and ensure a highly professional tone.

You MUST respond strictly with a valid JSON object matching the following structure exactly. Do not output any conversational text, markdown formatting blocks like \`\`\`json, or anything outside the JSON object.

{
  "summary": "Professional summary...",
  "experience": [
    {
      "company": "Company Name",
      "jobTitle": "Job Title",
      "location": "Location",
      "startDate": "Start Date",
      "endDate": "End Date",
      "current": false,
      "responsibilities": "Bullet point 1\\nBullet point 2",
      "achievements": "Achievement 1\\nAchievement 2"
    }
  ],
  "education": [
    {
      "institution": "Institution Name",
      "degree": "Degree",
      "fieldOfStudy": "Field",
      "startDate": "Start Date",
      "endDate": "End Date",
      "gpa": "GPA",
      "description": "Description"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Description",
      "technologies": "Tech stack",
      "projectUrl": "URL"
    }
  ],
  "certifications": [
    {
      "name": "Name",
      "issuer": "Issuer",
      "date": "Date",
      "url": "URL"
    }
  ],
  "skills": ["Skill 1", "Skill 2"],
  "achievements": ["Achievement 1", "Achievement 2"]
}`;

  const userPrompt = `Here is the user's raw resume data to process:\n${JSON.stringify(resumeData, null, 2)}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: model,
      temperature: 0.3, // Lower temperature for more factual/predictable output
      max_tokens: 4000,
      response_format: { type: 'json_object' } // Enforce JSON object response
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No content generated from AI.');
    }

    // Attempt to parse the structured JSON
    const parsedData = JSON.parse(responseContent);
    return parsedData;

  } catch (error) {
    console.error('Groq AI Service Error:', error);
    throw new Error('Failed to generate resume content using AI.');
  }
};

module.exports = {
  generateResumeContent
};
