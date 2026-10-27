export const AGENCY_INFO = {
  name: "Apex Talent Agency & Screening Hub",
  director: "Prof. Ananya Sharma (Agency Director / 'Mam')",
  bio: "Leading Recruitment Agency. Open applications for all candidates, followed by AI assessment screening & manual director shortlisting.",
  email: "director@apextalent.agency",
  phone: "+1 (555) 389-2041",
  activeJobsCount: 4,
  totalApplicationsThisMonth: 142
};

export const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer",
    client: "TechCorp Global",
    location: "Remote / Hybrid",
    minScore: 75,
    mustHaves: ["Node.js & React", "System Design", "3+ Yrs Exp"],
    knockoutRule: "Fails mandatory System Design question OR total score < 75%",
    status: "Active",
    applicantsCount: 24
  },
  {
    id: "job-2",
    title: "AI & Data Science Specialist",
    client: "NeuroData Systems",
    location: "New York, NY",
    minScore: 80,
    mustHaves: ["Python & PyTorch", "LLM Fine-tuning", "SQL Optimization"],
    knockoutRule: "Score < 80% OR incorrect PyTorch memory management logic",
    status: "Active",
    applicantsCount: 18
  },
  {
    id: "job-3",
    title: "Lead Product Manager",
    client: "InnoVisions Inc",
    location: "San Francisco, CA",
    minScore: 70,
    mustHaves: ["Agile Roadmap", "Data Analytics", "Client Facing"],
    knockoutRule: "Score < 70%",
    status: "Active",
    applicantsCount: 12
  }
];

export const INITIAL_CANDIDATES = [
  {
    id: "cand-101",
    name: "Aarav Patel",
    email: "aarav.p@gmail.com",
    role: "Senior Full-Stack Engineer",
    score: 92,
    technicalScore: 95,
    problemSolvingScore: 88,
    status: "Shortlisted & Confirmed",
    appliedDate: "2026-10-06 14:30",
    requestedSlot: "2026-10-07 at 02:00 PM",
    summary: "Exceptional system design logic and clean API architectural understanding. Approved by Mam for interview.",
    aiNotes: "Answered Hard difficulty questions accurately. Handled concurrency edge cases seamlessly.",
    shortlistedByDirector: true,
    testCompleted: true
  },
  {
    id: "cand-102",
    name: "Maya Lin",
    email: "maya.lin@devcraft.io",
    role: "Senior Full-Stack Engineer",
    score: 84,
    technicalScore: 86,
    problemSolvingScore: 82,
    status: "Applied (Awaiting Shortlist)",
    appliedDate: "2026-10-06 16:10",
    requestedSlot: "2026-10-08 at 11:30 AM",
    summary: "Strong candidate who applied and completed assessment. Pending Mam's final approval.",
    aiNotes: "Passed all technical checks with 84% aggregate score.",
    shortlistedByDirector: false,
    testCompleted: true
  },
  {
    id: "cand-103",
    name: "Rohan Mehta",
    email: "rohan.mehta@devstudio.com",
    role: "Senior Full-Stack Engineer",
    score: 68,
    technicalScore: 65,
    problemSolvingScore: 71,
    status: "Needs Manual Review",
    appliedDate: "2026-10-05 16:45",
    requestedSlot: "2026-10-09 at 03:30 PM",
    summary: "Applied and took assessment. Score is borderline (68% vs 75% cutoff).",
    aiNotes: "Borderline score. Recommend Mam review before confirming slot.",
    shortlistedByDirector: false,
    testCompleted: true
  },
  {
    id: "cand-104",
    name: "Vikram Kumar",
    email: "vikram.k@inbox.net",
    role: "Senior Full-Stack Engineer",
    score: 42,
    technicalScore: 40,
    problemSolvingScore: 45,
    status: "Knockout / Filtered Out",
    appliedDate: "2026-10-05 09:20",
    requestedSlot: "2026-10-08 at 02:00 PM",
    summary: "Applied, but failed must-have knockout criteria on asynchronous safety.",
    aiNotes: "Knockout rule triggered during assessment.",
    shortlistedByDirector: false,
    testCompleted: true
  },
  {
    id: "cand-105",
    name: "Sophia Rodriguez",
    email: "sophia.r@techmail.io",
    role: "AI & Data Science Specialist",
    score: 88,
    technicalScore: 90,
    problemSolvingScore: 86,
    status: "Shortlisted & Confirmed",
    appliedDate: "2026-10-04 15:10",
    requestedSlot: "2026-10-08 at 11:00 AM",
    summary: "High PyTorch score. Approved and shortlisted by Mam.",
    aiNotes: "Correctly resolved GPU memory leak question.",
    shortlistedByDirector: true,
    testCompleted: true
  }
];

export const APPOINTMENTS = [
  {
    id: "app-1",
    candidateName: "Aarav Patel",
    email: "aarav.p@gmail.com",
    role: "Senior Full-Stack Engineer",
    score: 92,
    type: "AI Screened (Shortlisted)",
    status: "Confirmed by Mam",
    date: "2026-10-07",
    time: "02:00 PM",
    notes: "Shortlisted after scoring 92% on AI assessment."
  },
  {
    id: "app-2",
    candidateName: "Sophia Rodriguez",
    email: "sophia.r@techmail.io",
    role: "AI & Data Science Specialist",
    score: 88,
    type: "AI Screened (Shortlisted)",
    status: "Confirmed by Mam",
    date: "2026-10-08",
    time: "11:00 AM",
    notes: "Shortlisted after scoring 88% on AI assessment."
  },
  {
    id: "app-3",
    candidateName: "Maya Lin",
    email: "maya.lin@devcraft.io",
    role: "Senior Full-Stack Engineer",
    score: 84,
    type: "Direct Appointment with Mam",
    status: "Pending Mam Approval",
    date: "2026-10-08",
    time: "11:30 AM",
    notes: "Applied & completed assessment. Awaiting Mam's shortlist decision."
  }
];

// ============================================================
// COMPUTER FUNDAMENTALS QUESTION BANK
// Covers: OS, DBMS, Networks, OOP, Data Structures, Algorithms
// ============================================================
export const CS_QUESTION_BANK = {
  Easy: [
    {
      id: "e1",
      questionText: "What is the primary purpose of an Operating System?",
      difficulty: "Easy",
      subject: "Operating Systems",
      topic: "OS Basics",
      options: [
        { id: "a", text: "To manage hardware resources and provide services to application software.", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "To create and delete files only.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "To compile and execute programs.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "To provide internet connectivity.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "An OS acts as an intermediary between users/applications and hardware, managing CPU, memory, I/O devices, and file systems."
    },
    {
      id: "e2",
      questionText: "What does DBMS stand for and what is its main function?",
      difficulty: "Easy",
      subject: "DBMS",
      topic: "Database Basics",
      options: [
        { id: "a", text: "Database Management System — manages and organizes structured data.", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "Data Backup & Migration System — used for data backups.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Dynamic Binary Math System — used for binary calculations.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Distributed Backend Memory System — manages RAM.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "DBMS is software that enables efficient data storage, retrieval, and manipulation using queries."
    },
    {
      id: "e3",
      questionText: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
      difficulty: "Easy",
      subject: "Data Structures",
      topic: "Linear DS",
      options: [
        { id: "a", text: "Queue", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "Stack", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Tree", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Heap", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "A Queue follows FIFO — the first element inserted is the first to be removed, like a real-world queue."
    },
    {
      id: "e4",
      questionText: "What is an IP address used for in computer networks?",
      difficulty: "Easy",
      subject: "Computer Networks",
      topic: "Networking Basics",
      options: [
        { id: "a", text: "To uniquely identify a device on a network for routing data packets.", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "To encrypt data during transmission.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "To store login credentials on a server.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "To measure network bandwidth.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "An IP address (IPv4 or IPv6) is a logical address that uniquely identifies each device on a network."
    },
    {
      id: "e5",
      questionText: "What is the time complexity of accessing an element in an array by index?",
      difficulty: "Easy",
      subject: "Algorithms",
      topic: "Complexity Analysis",
      options: [
        { id: "a", text: "O(1) — Constant time.", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "O(n) — Linear time.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "O(log n) — Logarithmic time.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "O(n²) — Quadratic time.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Arrays store elements at contiguous memory locations; direct index access is always O(1)."
    },
    {
      id: "e6",
      questionText: "Which OOP concept allows a class to inherit properties and methods from another class?",
      difficulty: "Easy",
      subject: "OOP",
      topic: "OOP Concepts",
      options: [
        { id: "a", text: "Inheritance", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "Encapsulation", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Abstraction", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Polymorphism", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Inheritance enables a child class to reuse code from a parent class, promoting code reusability."
    },
    {
      id: "e7",
      questionText: "In SQL, which keyword is used to retrieve unique records from a table?",
      difficulty: "Easy",
      subject: "DBMS",
      topic: "SQL Basics",
      options: [
        { id: "a", text: "DISTINCT", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "UNIQUE", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "FILTER", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "GROUP", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "SELECT DISTINCT eliminates duplicate rows from the result set in SQL."
    },
    {
      id: "e8",
      questionText: "What does RAM stand for and what is its primary function?",
      difficulty: "Easy",
      subject: "Computer Organization",
      topic: "Memory",
      options: [
        { id: "a", text: "Random Access Memory — temporary storage for currently running programs.", isCorrect: true, scoreAdd: 10 },
        { id: "b", text: "Read-Access Module — stores ROM data permanently.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Remote Access Machine — enables remote connections.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Rapid Algorithm Memory — accelerates CPU computations.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "RAM is volatile memory that temporarily holds data and instructions for the CPU to process."
    }
  ],
  Medium: [
    {
      id: "m1",
      questionText: "What is a deadlock in operating systems, and which condition must be TRUE for a deadlock to occur?",
      difficulty: "Medium",
      subject: "Operating Systems",
      topic: "Process Management",
      options: [
        { id: "a", text: "A state where processes wait indefinitely for resources held by each other; requires mutual exclusion, hold-and-wait, no preemption, and circular wait.", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "A situation where CPU usage reaches 100%; caused by insufficient RAM.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "A network timeout that blocks all data transmission.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "A compile-time error caused by circular imports in code.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Deadlock occurs when the four Coffman conditions hold: mutual exclusion, hold-and-wait, no preemption, and circular wait."
    },
    {
      id: "m2",
      questionText: "What is the difference between a Primary Key and a Foreign Key in RDBMS?",
      difficulty: "Medium",
      subject: "DBMS",
      topic: "Relational Model",
      options: [
        { id: "a", text: "Primary Key uniquely identifies a row in its own table; Foreign Key references the Primary Key of another table to maintain referential integrity.", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "Primary Key is used for searching; Foreign Key is used for sorting.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Both are the same; 'Foreign' just means the key is in a different column.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Primary Key can have NULLs; Foreign Key cannot.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Primary Keys enforce entity integrity (unique + NOT NULL). Foreign Keys establish relationships between tables."
    },
    {
      id: "m3",
      questionText: "Explain the difference between TCP and UDP protocols.",
      difficulty: "Medium",
      subject: "Computer Networks",
      topic: "Transport Layer",
      options: [
        { id: "a", text: "TCP is connection-oriented and reliable (guarantees delivery & ordering); UDP is connectionless and faster with no delivery guarantees.", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "TCP is used only for file transfers; UDP is used only for browsing.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "TCP sends one packet at a time; UDP sends multiple packets simultaneously.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "UDP is always slower than TCP due to error checking.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "TCP provides reliability via handshake, acknowledgment, and retransmission. UDP sacrifices reliability for low latency (e.g., video streaming, DNS)."
    },
    {
      id: "m4",
      questionText: "What is the time complexity of Binary Search, and what is its main prerequisite?",
      difficulty: "Medium",
      subject: "Algorithms",
      topic: "Searching Algorithms",
      options: [
        { id: "a", text: "O(log n); the array must be sorted before binary search can be applied.", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "O(n); works on any unsorted or sorted array.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "O(n log n); the array must be partially sorted.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "O(1); it directly computes the index using a hash function.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Binary search halves the search space each step → O(log n). It requires a sorted dataset to work correctly."
    },
    {
      id: "m5",
      questionText: "What is polymorphism in OOP, and what are its two types?",
      difficulty: "Medium",
      subject: "OOP",
      topic: "OOP Concepts",
      options: [
        { id: "a", text: "Polymorphism means 'many forms'; types are compile-time (method overloading) and runtime (method overriding).", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "Polymorphism means using multiple inheritance; types are single and multiple.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Polymorphism is the same as abstraction; both hide implementation.", isCorrect: false, scoreAdd: 5 },
        { id: "d", text: "Polymorphism only exists in interpreted languages like Python.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Compile-time polymorphism (overloading) is resolved at compile time; runtime polymorphism (overriding) is resolved via virtual dispatch at runtime."
    },
    {
      id: "m6",
      questionText: "What is a Binary Search Tree (BST), and what is the average time complexity for search?",
      difficulty: "Medium",
      subject: "Data Structures",
      topic: "Trees",
      options: [
        { id: "a", text: "A BST is a tree where left children < root < right children; average search is O(log n).", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "A BST is a fully balanced binary tree; search is always O(1).", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "A BST allows duplicate values on both sides; average search is O(n).", isCorrect: false, scoreAdd: 5 },
        { id: "d", text: "A BST stores only sorted integers; search is O(n log n).", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "BST property: left subtree keys < node < right subtree keys. Average O(log n); worst case O(n) for skewed trees."
    },
    {
      id: "m7",
      questionText: "What is the difference between process and thread in OS?",
      difficulty: "Medium",
      subject: "Operating Systems",
      topic: "Concurrency",
      options: [
        { id: "a", text: "A process is an independent program with its own memory space; a thread is a lightweight unit within a process that shares memory with other threads.", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "Threads and processes are identical — they both use separate memory spaces.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "A thread is a full program; a process is a sub-unit of a thread.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "A process runs on GPU; a thread runs on CPU.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Processes have isolated memory and are heavyweight. Threads share memory within the same process and are lighter, enabling concurrent execution."
    },
    {
      id: "m8",
      questionText: "What is Normalization in databases and why is it important?",
      difficulty: "Medium",
      subject: "DBMS",
      topic: "Normalization",
      options: [
        { id: "a", text: "Normalization is the process of organizing a database to reduce data redundancy and improve data integrity by applying normal forms (1NF, 2NF, 3NF).", isCorrect: true, scoreAdd: 20 },
        { id: "b", text: "Normalization is used to speed up query execution by removing indexes.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Normalization is the process of encrypting database fields for security.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Normalization combines multiple tables into a single large table for faster access.", isCorrect: false, scoreAdd: 5 }
      ],
      explanation: "Normalization eliminates redundancy and update anomalies by systematically decomposing tables using dependency rules and normal forms."
    }
  ],
  Hard: [
    {
      id: "h1",
      questionText: "Explain the difference between paging and segmentation in memory management. Which resolves external fragmentation?",
      difficulty: "Hard",
      subject: "Operating Systems",
      topic: "Memory Management",
      options: [
        { id: "a", text: "Paging divides memory into fixed-size frames (eliminates external fragmentation but causes internal fragmentation); Segmentation divides by logical units (causes external fragmentation). Paging resolves external fragmentation.", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Both paging and segmentation cause external fragmentation equally.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "Segmentation eliminates all types of fragmentation; paging causes both.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Paging uses logical addresses; segmentation uses physical addresses only.", isCorrect: false, scoreAdd: 5 }
      ],
      explanation: "Paging uses fixed-size pages/frames → no external fragmentation. Segmentation uses variable-size logical segments → can have external fragmentation."
    },
    {
      id: "h2",
      questionText: "What is ACID in database transactions and what does each property guarantee?",
      difficulty: "Hard",
      subject: "DBMS",
      topic: "Transactions",
      options: [
        { id: "a", text: "Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions appear serial), Durability (committed data survives failures).", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Accuracy, Consistency, Integrity, Durability — database design principles.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "Atomicity (data types match), Concurrency (parallel access), Isolation (encrypted data), Durability (backup).", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "ACID is a NoSQL-specific property that doesn't apply to relational databases.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "ACID properties ensure reliable transaction processing: Atomicity prevents partial updates, Isolation manages concurrency, Durability ensures persistence via WAL or redo logs."
    },
    {
      id: "h3",
      questionText: "How does a Hash Table work, and what is the worst-case time complexity for lookup? What causes this?",
      difficulty: "Hard",
      subject: "Data Structures",
      topic: "Hashing",
      options: [
        { id: "a", text: "A hash function maps keys to array indices. Average O(1) lookup. Worst case O(n) due to hash collisions — all keys mapping to the same bucket (a degenerate case).", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Hash tables always guarantee O(1) lookup in all cases regardless of input.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "Worst case O(log n) due to internal sorting of buckets.", isCorrect: false, scoreAdd: 5 },
        { id: "d", text: "Hash tables use binary search internally — worst case O(log n).", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "In a worst-case (bad hash + many collisions), all keys map to one slot, turning it into a linked list → O(n). Good hash functions and load factor management prevent this."
    },
    {
      id: "h4",
      questionText: "In computer networks, what is the difference between routing and switching? What layer do they operate at in the OSI model?",
      difficulty: "Hard",
      subject: "Computer Networks",
      topic: "OSI Model",
      options: [
        { id: "a", text: "Switching forwards frames using MAC addresses at Layer 2 (Data Link); Routing forwards packets using IP addresses at Layer 3 (Network). Switches are for local LAN; Routers connect different networks.", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Both routing and switching operate at Layer 4 (Transport); they differ only in protocol used.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Routing uses MAC addresses at Layer 2; Switching uses IP at Layer 3.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Switching operates at Layer 7 (Application) for smart traffic management.", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Layer 2 switches use MAC tables for intra-network forwarding. Layer 3 routers use IP routing tables to forward packets between networks (inter-network)."
    },
    {
      id: "h5",
      questionText: "What is the SOLID principle in OOP? Which principle states that a class should have only ONE reason to change?",
      difficulty: "Hard",
      subject: "OOP",
      topic: "Design Principles",
      options: [
        { id: "a", text: "SOLID = Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Single Responsibility Principle (SRP) — a class should have only one reason to change.", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "SOLID is a security model; Open/Closed Principle ensures data privacy.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "SOLID stands for Scalable, Optimal, Lightweight, Integrated, Distributed — a microservices pattern.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "The Dependency Inversion Principle requires a class to have only one reason to change.", isCorrect: false, scoreAdd: 5 }
      ],
      explanation: "SRP (the 'S' in SOLID) promotes high cohesion: each class handles exactly one concern, making code easier to maintain and test."
    },
    {
      id: "h6",
      questionText: "What is the time complexity of QuickSort in best, average, and worst cases? What causes worst-case performance?",
      difficulty: "Hard",
      subject: "Algorithms",
      topic: "Sorting Algorithms",
      options: [
        { id: "a", text: "Best/Average: O(n log n); Worst: O(n²) — triggered when the pivot is always the smallest or largest element (e.g., sorted array with first-element pivot).", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Best: O(n); Average: O(n log n); Worst: O(n log n) always.", isCorrect: false, scoreAdd: 5 },
        { id: "c", text: "Always O(n log n) regardless of input — QuickSort is always optimal.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Best: O(log n); Average: O(n); Worst: O(n²).", isCorrect: false, scoreAdd: 0 }
      ],
      explanation: "Poor pivot selection (e.g., always first element on sorted input) causes unbalanced partitions → O(n²). Random pivot or median-of-3 mitigates this."
    },
    {
      id: "h7",
      questionText: "What is virtual memory in operating systems and how does a page fault work?",
      difficulty: "Hard",
      subject: "Operating Systems",
      topic: "Virtual Memory",
      options: [
        { id: "a", text: "Virtual memory extends RAM using disk storage (swap space). A page fault occurs when a process accesses a page NOT in physical RAM → OS loads it from disk, updating the page table.", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "Virtual memory is extra RAM added via hardware upgrades; page faults are hardware errors.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "Virtual memory stores GPU data; a page fault triggers a GPU reset.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "Page faults occur when a program tries to access RAM that belongs to another program — causing a security exception.", isCorrect: false, scoreAdd: 5 }
      ],
      explanation: "Virtual memory uses demand paging. On a page fault, the OS kernel interrupts execution, locates the page on disk, brings it into RAM, and resumes the process."
    },
    {
      id: "h8",
      questionText: "Explain the CAP theorem in distributed systems. What does it state?",
      difficulty: "Hard",
      subject: "Distributed Systems",
      topic: "Distributed Computing",
      options: [
        { id: "a", text: "CAP theorem states a distributed system can only guarantee 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network splits).", isCorrect: true, scoreAdd: 30 },
        { id: "b", text: "CAP stands for Cache, API, Performance — a backend optimization theorem.", isCorrect: false, scoreAdd: 0 },
        { id: "c", text: "CAP theorem states all three properties can be achieved simultaneously with enough hardware.", isCorrect: false, scoreAdd: 0 },
        { id: "d", text: "CAP only applies to relational databases, not NoSQL systems.", isCorrect: false, scoreAdd: 5 }
      ],
      explanation: "Network partitions are inevitable in distributed systems, so designers must choose between CP (e.g., HBase) or AP (e.g., Cassandra). No system can be CAP-complete."
    }
  ]
};

// Default test configuration set by the faculty
export const DEFAULT_TEST_CONFIG = {
  questionCount: 5,
  level: 'Mixed', // 'Easy', 'Medium', 'Hard', 'Mixed' (adaptive)
  timePerQuestion: 40,
  configuredBy: 'Prof. Ananya Sharma',
  configuredAt: null,
  isActive: true
};
