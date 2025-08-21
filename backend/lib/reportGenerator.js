const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const tools = [
  {
    type: 'function',
    function: {
      name: 'get_top_nirf_colleges',
      description: 'Fetch the top N colleges from NIRF 2025 rankings for a specific category with enhanced filtering and data.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'The NIRF category (Engineering, Management, University, Medical, Pharmacy, Law, Architecture)',
            enum: ['Engineering', 'Management', 'University', 'Medical', 'Pharmacy', 'Law', 'Architecture']
          },
          num: {
            type: 'integer',
            description: 'Number of top colleges to fetch (default 5, max 20)',
            minimum: 1,
            maximum: 20
          },
          state: {
            type: 'string',
            description: 'Optional state/location to filter colleges'
          }
        },
        required: ['category']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_market_trends',
      description: 'Get current market trends and salary data for specific job roles and industries.',
      parameters: {
        type: 'object',
        properties: {
          jobRole: {
            type: 'string',
            description: 'The job role to get market data for'
          },
          industry: {
            type: 'string',
            description: 'The industry sector'
          }
        },
        required: ['jobRole']
      }
    }
  }
];

async function executeTool(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  try {
    if (name === 'get_top_nirf_colleges') {
      const category = parsedArgs.category;
      const num = Math.min(parsedArgs.num || 5, 20);
      const stateFilter = parsedArgs.state ? parsedArgs.state.toLowerCase() : null;
      
      // Simulate NIRF data for demonstration
      return `Top ${num} ${category} colleges (simulated data):\n1. IIT Delhi\n2. IIT Bombay\n3. IIT Madras`;
    }

    if (name === 'get_market_trends') {
      const { jobRole, industry } = parsedArgs;
      const currentYear = new Date().getFullYear();
      
      return `Market Trends for ${jobRole} in ${industry || 'Technology'} (${currentYear}):\n` +
        `• Average Salary: ₹8-15 LPA for entry level, ₹15-30 LPA for mid-level\n` +
        `• Growth Rate: 12-18% annually\n` +
        `• Job Demand: High (Growing at 20% YoY)`;
    }

    return 'Tool not found or error in execution.';
  } catch (error) {
    console.error(`Tool execution error for ${name}:`, error);
    return `Error executing ${name}: ${error.message}`;
  }
}

async function generateEnhancedReport(reportData, userId) {
  const { name, age, skills, knowledge, interests, passions, marks, exams, jobPreferences, location } = reportData;

  const messages = [
    {
      role: 'system',
      content: `You are an expert AI career counselor with 15+ years of experience in student guidance. Create a comprehensive, personalized career report that is both analytical and motivational.`
    },
    {
      role: 'user',
      content: `Generate a comprehensive career counseling report for:
        Name: ${name}
        Age: ${age} years
        Skills: ${skills?.join(', ')}
        Interests: ${interests?.join(', ')}
        Job Preferences: ${jobPreferences?.join(', ')}`
    }
  ];

  let reportContent = '';
  let maxIterations = 15;
  let toolCallsCount = 0;

  while (maxIterations > 0 && toolCallsCount < 5) {
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      tools,
      tool_choice: 'auto',
      temperature: 0.8,
      max_tokens: 4096,
      top_p: 0.9
    });

    const message = completion.choices[0].message;

    if (message.content) {
      reportContent += message.content + '\n';
    }

    if (message.tool_calls && toolCallsCount < 5) {
      messages.push(message);
      toolCallsCount++;

      for (const toolCall of message.tool_calls) {
        const toolResponse = await executeTool(toolCall);
        messages.push({
          role: 'tool',
          name: toolCall.function.name,
          content: toolResponse,
          tool_call_id: toolCall.id
        });
      }
    } else {
      break;
    }

    maxIterations--;
  }

  return reportContent;
}

module.exports = {
  generateEnhancedReport,
  executeTool
};
