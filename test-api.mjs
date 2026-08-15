#!/usr/bin/env node

import fs from 'fs';

const resumeData = JSON.parse(fs.readFileSync('./test-resume.json', 'utf-8'));

const testResume = async () => {
  try {
    console.log('[Test] Starting resume generation test...');
    const response = await fetch('http://localhost:5000/api/resumes/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token-123'
      },
      body: JSON.stringify(resumeData)
    });

    console.log('[Test] Response status:', response.status);
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      if (response.ok) {
        console.log('[Test] ✅ Resume generated successfully!');
        console.log('[Test] Resume ID:', data._id);
        console.log('[Test] Title:', data.title);
        console.log('[Test] Summary:', data.summary);
      } else {
        console.log('[Test] ❌ Error:', data.message);
      }
    } catch (e) {
      console.log('[Test] ❌ Response is not JSON:');
      console.log(text);
    }
  } catch (error) {
    console.error('[Test] ❌ Test failed:', error.message);
  }
};

testResume();
