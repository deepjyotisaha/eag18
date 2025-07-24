# EAG18 - Agentic Query Assistant System

A sophisticated multi-agent AI system built with NetworkX graph architecture that processes complex user queries through a coordinated pipeline of specialized agents. The system combines multiple AI agents with external tools to handle tasks ranging from document analysis to code generation and web research.

## 🏗️ System Architecture

### Core Components

- **NetworkX Graph Engine**: Manages execution flow and dependencies
- **Multi-Agent Pipeline**: 10 specialized agents working in coordination
- **MCP (Model Context Protocol) Servers**: External tool integration
- **Rich CLI Interface**: Interactive command-line experience
- **Web API**: RESTful interface for web integration

### Execution Flow

```
User Query → File Upload → File Profiling → Planning → Multi-Agent Execution → Result Analysis → Output
```

## 🤖 Multi-Agent System

The system uses a **graph-based execution model** where specialized agents work together to solve complex tasks:

### Agent Types & Responsibilities

#### 1. **PlannerAgent** 🧠
- **Role**: Strategic planning and task decomposition
- **Capabilities**: 
  - Converts user queries into execution graphs
  - Implements meta-planning for unknown data discovery
  - Creates dependency-aware task sequences
  - Uses executive-grade planning strategies

#### 2. **DistillerAgent** 📊
- **Role**: File analysis and content summarization
- **Capabilities**:
  - Analyzes uploaded file structures and content
  - Extracts key information from documents
  - Creates file profiles for downstream agents
  - Handles multiple file formats (PDF, CSV, Excel, etc.)

#### 3. **RetrieverAgent** 🔍
- **Role**: Web search and information gathering
- **Capabilities**:
  - Performs internet searches
  - Extracts content from web pages
  - Handles document retrieval
  - Supports multiple iterations for comprehensive research

#### 4. **ThinkerAgent** 💭
- **Role**: Analysis and reasoning
- **Capabilities**:
  - Processes and synthesizes information
  - Performs logical analysis
  - Generates insights from data
  - Supports complex reasoning tasks

#### 5. **QAAgent** ❓
- **Role**: Question answering and validation
- **Capabilities**:
  - Validates generated content
  - Answers specific questions
  - Quality assurance checks
  - Cross-references information

#### 6. **CoderAgent** 💻
- **Role**: Code generation and file creation
- **Capabilities**:
  - Generates Python, HTML, CSS, JavaScript code
  - Creates complete applications
  - Supports AST-based file modifications
  - Handles multiple file creation scenarios

#### 7. **ExecutorAgent** ⚡
- **Role**: Code execution and testing
- **Capabilities**:
  - Runs generated code in sandboxed environment
  - Tests functionality
  - Handles execution errors
  - Manages file operations

#### 8. **FormatterAgent** 📝
- **Role**: Output formatting and presentation
- **Capabilities**:
  - Formats results for presentation
  - Creates reports and summaries
  - Handles different output formats
  - Ensures consistent styling

#### 9. **ClarificationAgent** 🔍
- **Role**: Query refinement and clarification
- **Capabilities**:
  - Asks clarifying questions
  - Refines ambiguous queries
  - Ensures task understanding
  - Improves execution accuracy

#### 10. **SchedulerAgent** ⏰
- **Role**: Task scheduling and optimization
- **Capabilities**:
  - Optimizes execution order
  - Manages resource allocation
  - Handles task dependencies
  - Improves performance

### Agent Coordination

Agents communicate through a **NetworkX graph structure** where:
- **Nodes** represent individual tasks assigned to specific agents
- **Edges** represent data flow and dependencies between tasks
- **Execution** follows topological sorting of the graph
- **Data** flows from one agent to the next through the graph structure

### Key Features

#### 🔄 **Iterative Execution**
- Agents can call themselves multiple times (`call_self=true`)
- Supports refinement and improvement cycles
- Enables complex multi-step reasoning

#### 🛠️ **Tool Integration**
- MCP servers provide external capabilities
- Web search, document processing, and more
- Extensible tool ecosystem

#### 📁 **File Management**
- Drag-and-drop file upload support
- Automatic file type detection
- Secure file processing

#### 🎯 **Meta-Planning**
- Automatic discovery of unknown data requirements
- Strategic planning for complex tasks
- Executive-grade task decomposition

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Required dependencies (see `pyproject.toml`)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd eag18/code

# Install dependencies
pip install -e .
```

### Running the System
```bash
python main.py
```

### Usage
1. **Upload Files** (optional): Drag and drop files for analysis
2. **Ask Questions**: Provide natural language queries
3. **Get Results**: Receive comprehensive, multi-agent processed responses

## 🔧 Configuration

### Agent Configuration (`config/agent_config.yaml`)
- Define agent behaviors and capabilities
- Configure model assignments
- Set MCP server dependencies

### MCP Server Configuration (`config/mcp_server_config.yaml`)
- Configure external tool servers
- Set up web search capabilities
- Define server transport methods

## 📊 Sample Use Cases

The system excels at complex tasks requiring multiple steps:

### Research & Analysis
- Market research with data visualization
- Competitive analysis with comprehensive reporting
- Document analysis with insights extraction

### Code Generation
- Complete web applications
- Data processing scripts
- Interactive games and tools

### Content Creation
- Comprehensive reports with charts and tables
- Multi-format content generation
- Structured data presentation

---

## 📝 Sample Prompts

Below are example queries that demonstrate the system's capabilities:

# Find the ASCII values of characters in INDIA and then return sum of exponentials of those values.
# How much Anmol singh paid for his DLF apartment via Capbridge? 
# What do you know about Don Tapscott and Anthony Williams?
# What is the relationship between Gensol and Go-Auto?
# which course are we teaching on Canvas LMS? "H:\DownloadsH\How to use Canvas LMS.pdf"
# Summarize this page: https://theschoolof.ai/
# What is the log value of the amount that Anmol singh paid for his DLF apartment via Capbridge? Hint: use local 
# find the the main difference between latest BMW 7 and 5 series online. Reply back in detail and in markdown.
# How much money did Anmol Singh paid to DLF to buy an apartment in Camelias indirectly? Search local storage agian?
# What are the main differences between Mercedes S Class end E Class. Reply back in markdown list. 
# Who is the current chairman of DLF? Search local documents. 



- Mahindra has launched a new vehicle called xuv 3xo, I want to know feature details, digital features, safety features, price etc. Use the following pattern -> find sources → extract details; You can use 2 only two steps for Retriever Agent OR use two itertations (using call_self=true) of Retriever Agent in a single step to fetch detailed information.

- Create a visually appealing tic-tac-toe game 
- Create a tic-tac-toe game 

I want a comprehensive report on the features for Mahindra XUV 3XO, and you must also include a detailed analysis of the luxury and safety features. Use a single step for Retriever Agent but use multiple iterations (call_self=true) in a single step to fetch detailed information, In the final iteration of the Retriever Agent combine outputs from current and previous iterations as final step output which will be then used  then create a report.

I want a very  report the SUV segment, sales trends, market size etc. Then details on the features for Mahindra XUV 3XO, and you must also include a detailed analysis of the luxury and safety features. Make sure you have tables and charts in your final HTML report. Use the Report Generator agent to egenrate the final HTML report. You dont need to use Formatter Agent. Use only Retriever and Report Generator. You are being paid $100,000, be detailed and comprehensive, as well as visually appealing

You are a stock researcher, prepare a very very detailed and comprehensive report on Asian Paints. You must include graphs, tables, comparisons. Finally you must share a well formatted and polished HTML report. You get extra money for making the report very comprehensive and visually appealing! (use Report Generator Agent directly to generate charts, tables and HTML report). Hint: For graphs, and tables, you must first collect relevant data sources (revenue trend, market share etc.) and then use Coder Agent to generate the graphs


Create a visually appealing tic-tac-toe game, use multiple iterations of Coder Agent to enhance visual appeal!

Create a visually appealing tic-tac-toe game, use a single step of Coder Agent but use multiple iterations to enhance visual appeal! You must have seperate files for HTML, JS and CSS

Create a new tictactoe game that two people can play, it should have a timer of 10 seconds to make the play and when one user wins, they get a point. User should be able to reset and play another game. Maintain and display points tally. Whoever gets 3 points first wins. Use ONLY ONE step of CoderAgent but use MULTIPLE ITERATIONS (call_self=True) of the same step! You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing!

Create a new tictactoe game that two people can play, it should have a timer of 10 seconds to make the play and when one user wins, they get a point. User should be able to reset and play another game. Maintain and display points tally. Whoever gets 3 points first wins. Have multiple files for HTML, JS and CSS. Use ONLY ONE step of CoderAgent but use MULTIPLE ITERATIONS (call_self=True) of the same step to enrich the game logic, visual or layout! You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing!


Create a new tictactoe game that two people can play and when one user wins, they get a point. Users should be able to reset and play another game. Maintain and display points tally which is visually appealing. Have seperate files for HTML, JS and CSS. Use ONLY ONE step of CoderAgent but use MULTIPLE ITERATIONS (call_self=True) of the same step to enrich the game logic, visual or layout! You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing! [Suggested Plan: Coder Agent -> QA Agent -> Coder Agent -> QA Agent]


You are a stock researcher, prepare a very very detailed and comprehensive report on TESLA. You must include graphs, tables, comparisons. Finally you must share a well formatted and polished HTML report. You get extra money for making the report very comprehensive and making it visually appealing and including charts, tables etc.! (Hint: Use Report Generator Agent directly to generate charts, tables and the HTML report).

Create a new tictactoe game that two people can play and when one user wins, they get a point. Users should be able to reset and play another game. Maintain and display points tally which is visually appealing. Have seperate files for HTML, JS and CSS. Use ONLY ONE step of CoderAgent but use MULTIPLE ITERATIONS (call_self=True) of the same step to enrich the game logic, visual or layout, till you meet the requirement! You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing! [Suggested Plan: Coder Agent -> QA Agent -> Coder Agent -> QA Agent]

Create a new tictactoe game that two people can play and when one user wins, they get a point. Users should be able to reset and play another game. Maintain and display points tally which is visually appealing. Have seperate files for HTML, JS and CSS. You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing! [Suggested Plan: Coder Agent -> QA Agent -> Coder Agent -> QA Agent]

Create a new tictactoe game that two people can play and when one user wins, they get a point. Users should be able to reset and play another game. Maintain and display points tally which is visually appealing. Have seperate files for HTML, JS and CSS. You dont need any clarifications. You dont need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing! Make sure that all the HTML, CSS and JS files work together so that user can play the game without errors. [Suggested Plan: Coder Agent -> QA Agent -> Coder Agent -> QA Agent]


I want a comprehensive report on the features for Mahindra XUV 3XO, and you must also include a detailed analysis of the luxury and safety features. Use the Report Generator Agent directly to generate charts, tables and the HTML report





