import getGroq from '../config/groq.js';

const generateResumeContent = async (resumeData) => {
  const groq = getGroq();
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

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
    console.log('[Groq Service] Calling Groq API with model:', model);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: model,
      temperature: 0.3, // Lower temperature for more factual/predictable output
      max_tokens: 4000
    });

    console.log('[Groq Service] API call successful');
    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    if (!responseContent) {
      console.error('[Groq Service] No content in response');
      throw new Error('No content generated from AI.');
    }

    console.log('[Groq Service] Response received, length:', responseContent.length);
    console.log('[Groq Service] Response preview:', responseContent.substring(0, 200));

    // Clean up the response in case it contains markdown code blocks
    let jsonString = responseContent.trim();
    if (jsonString.startsWith('```json')) {
      console.log('[Groq Service] Removing ```json wrapper');
      jsonString = jsonString.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonString.startsWith('```')) {
      console.log('[Groq Service] Removing ``` wrapper');
      jsonString = jsonString.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Attempt to parse the structured JSON
    const parsedData = JSON.parse(jsonString);
    console.log('[Groq Service] Successfully parsed Groq response');
    return parsedData;

  } catch (error) {
    console.error('[Groq Service] Error:', error.message);
    console.error('[Groq Service] Full error details:', {
      name: error.name,
      message: error.message,
      status: error.status,
      type: error.type
    });
    
    // Return a fallback structure to prevent total failure
    console.log('[Groq Service] Returning fallback resume structure');
    return {
      summary: resumeData.personalInfo?.summary || 'Professional summary not provided.',
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      projects: resumeData.projects || [],
      certifications: resumeData.certifications || [],
      skills: resumeData.skills || [],
      achievements: resumeData.achievements || []
    };
  }
};

export { generateResumeContent };
