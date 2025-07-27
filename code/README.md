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

[![Demo Video](https://img.youtube.com/vi/A0kznksbOiU/0.jpg)](https://www.youtube.com/watch?v=A0kznksbOiU)

> _Replace the link above with your actual demo video URL._

---

## 📝 Sample Prompts

Try these example queries to explore the system's capabilities:

**Research & Analysis:**

- You are a stock researcher, prepare a very detailed and comprehensive report on Asian Paints. 
- Conduct a basic market research on electric vehicle trends and create a detailed analysis report without visualizations

**Coding:**
- Create a modern Tic Tac Toe game with HTML, CSS, and JavaScript

**File Analysis:**
- Analyze the sales data provided in the file and prepare a report

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
uv run web_api.py
```

### Usage
1. **Upload Files** (optional): Drag and drop files for analysis
2. **Ask Questions**: Provide natural language queries
3. **Get Results**: Receive comprehensive, multi-agent processed responses
4. **Open the Web Interface**:  
   Open your browser and go to [http://localhost:5000](http://localhost:5000) (or `http://<your-ec2-ip>:5000` if running on EC2) to interact with the system via the web UI. Type your query and submit





