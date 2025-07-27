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

---

## 🎥 Demo Video

Watch a walkthrough of the EAG18 Agentic Query Assistant in action:

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)

> _Replace the link above with your actual demo video URL._

---

## 📝 Sample Prompts

Try these example queries to explore the system's capabilities:

**Research & Analysis:**

- Mahindra has launched a new vehicle called XUV 3XO, I want to know feature details, digital features, safety features, price etc. Use the following pattern → find sources → extract details; You can use only two steps for Retriever Agent OR use two iterations (using call_self=true) of Retriever Agent in a single step to fetch detailed information.
- Create a visually appealing tic-tac-toe game.
- Create a new tic-tac-toe game that two people can play, it should have a timer of 10 seconds to make the play and when one user wins, they get a point. User should be able to reset and play another game. Maintain and display points tally. Whoever gets 3 points first wins. Use ONLY ONE step of CoderAgent but use MULTIPLE ITERATIONS (call_self=True) of the same step! You don't need any clarifications. You don't need to build reports. Use beautiful theme and colour schemes, layout etc. You get extra money for making this visually appealing!
- You are a stock researcher, prepare a very detailed and comprehensive report on Asian Paints. You must include graphs, tables, comparisons. Finally you must share a well formatted and polished HTML report. (Hint: Use Report Generator Agent directly to generate charts, tables and the HTML report).

> _Feel free to experiment with your own queries!_

---

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

---

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

---

## 🔧 Configuration

### Agent Configuration (`config/agent_config.yaml`)
- Define agent behaviors and capabilities
- Configure model assignments
- Set MCP server dependencies

### MCP Server Configuration (`config/mcp_server_config.yaml`)
- Configure external tool servers
- Set up web search capabilities
- Define server transport methods

---

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





