/* ═══════════════════════════════════════════════════════════
   MDM4U COURSE DATA — this is the only file you edit.
   Semester 2, 2026–27: 88 class days, Mon Feb 1 to Wed Jun 16 2027,
   dated from MDM4U Course Plan 2027 S2.

   Each day looks like:
     {d:2, iso:"2027-02-02", topic:"Types of Data", num:"1.1",
      note:"", ans:"", extras:[]}

   - note: paste the URL of the blank note & practice problems.
           Empty "" shows a greyed-out link with "Coming soon".
   - ans:  paste the URL of the answers. Empty "" is greyed out
           with "Coming soon"; once filled it goes live with the
           ☠︎ "do not look" hover.
   - num:  the note number shown to students ("1.1 Blank Note &
           Practice Problems"). Days with no note (tests, work
           periods) just leave num out. noteLabel overrides the
           whole label when a day has no clean number (reviews).
   - flag: "pquiz" | "quiz" | "test" | "exam" tints the row and puts
           a flag at the top of the day; "review" only tints it.
   - covers: the topics written inside that flag, after the colon
           ("QUIZ: 5.1–5.5"). Leave "" and the flag is just the word.
   - topic: the lesson taught that day. On a flagged day it sits
           below the flag; leave "" if nothing else happens.
   - extras: [ ["Title","https://…","kind"], … ]
           kind = "doc" (worksheet/handout), "ans" (solutions,
           shows the ☠︎ warning), "vid" (video), "skills"
           (Prerequisite Skills sheet).

   D(id) is shorthand for a Google Drive link — paste either a
   full URL or D("fileId"), both work.

   KEYS: every KEY's id is stashed in a comment right after ans:""
   — after class, move it into the ans field.

   SHARING: the notes live in the gmail Drive (Classes/02A MDM4U).
   They open for students only once each unit folder (01 to 06,
   07 Stats Project, 08 Carnival) is set to "anyone with the link,
   viewer". The outline is in Course Planning/Public, already shared.

   To Save Time:

   git add . && git commit -m "1.1 key add" && git push origin main
   ═══════════════════════════════════════════════════════════ */

const D = id => `https://drive.google.com/file/d/${id}/view`;

const COURSE = {
  code: "MDM4U",
  title: "Data Management",
  sub: "Grade 12 · University Preparation",

  /* Pinned under the title, above the units: [label, url, kind, warn].
     kind = "outline" | "routine" | "calc". A warn string shows as a hazard
     note on hover (desktop) or first tap (phone). */
  essentials: [
    ["Course Outline",D("12PDCK6wZjHMung2bnAwYj3pivKluDIaS"),"outline"],   /* Course Planning/Public, LaTeX outline of 12 Oct 2026 */
    ["Approved Calculators",D("1Hq2HE1EzSy2frKT0pfDUSWshgf0GB7A1"),"calc","Must be one of these exact models"],
  ],

  units: [

  /* ── ORGANIZING DATA ─────────────────────────────────────── */
  {name:"Organizing Data", days:[
    {d:1, iso:"2027-02-01", topic:"Welcome to MDM4U · Prerequisite Skills",
      extras:[["Welcome to MDM4U (slides)", "https://docs.google.com/presentation/d/1Xbd6JHHNqGhsyuvRoo8L11sf5bEzt_eMaXnFHs7P-mM/edit", "doc"],
              ["Prerequisite Skills", D("1Zz14t6jUqb3VmGTxKQOE3_mpxMzM69oF"), "skills"]]},
    {d:2, iso:"2027-02-02", topic:"Types of Data", num:"1.1",
      note:D("10dxcF10OzzQT_tIPsdTqnUpDTmjOHBxm"),
      ans:D("1vPRA_gKzDDYbr4xfdvNtYVYO5Ra4beoR"), /* key: D("1vPRA_gKzDDYbr4xfdvNtYVYO5Ra4beoR") */
      extras:[["Spurious Correlations", "https://www.tylervigen.com/spurious-correlations", "doc"]]},
    {d:3, iso:"2027-02-03", topic:"Sampling Methods", num:"1.2",
      note:D("1F_YM9PR02ysRHzbjwZY0fGxg3L6Ij1NI"),
      ans:"", /* key: D("1K8HEI6V7CX1ni1C62GMeTi6ol6aKHa4q") */
      extras:[]},
    {d:4, iso:"2027-02-04", topic:"Collecting Data", num:"1.3",
      note:D("1i3qH2PXk1UDFa6TYb3JQrbfihZ5M6bCg"),
      ans:"", /* key: D("14VRtwEqp5xAr8g5JHw5WBdWGO2XgQDyo") */
      extras:[["Why Most Published Research is Wrong", "https://www.youtube.com/watch?v=42QuXLucH3Q", "vid"]]},
    {d:5, iso:"2027-02-05", topic:"Surveys & Presenting Data", num:"1.4",
      note:D("1KQxWAPUE3Hknu9x4t-4MP3dmEzu9KLbX"),
      ans:"", /* key: D("1h6EwBexQaMqyyyqN-7s7yiyF9qmrRl07") */
      extras:[["7 Tips for Good Survey Questions", "https://www.youtube.com/watch?v=Iq_fhTuY1hw", "vid"]]},
    {d:6, iso:"2027-02-08", topic:"Stats Project Launch · Survey Assignment",
      extras:[["Statistics Project", "https://docs.google.com/document/d/1THkHaMVSkWEll_yCA4KC2URW2V9PK2aMS1OERWIDjQ0/edit", "doc"],
              ["Survey Assignment", "https://docs.google.com/document/d/1izlGAPhg39Cqoqhp7u8YRcoBLsGz7FjQGkFpEvkNmCk/edit", "doc"],
              ["Survey Assignment Exemplar", "https://docs.google.com/document/d/1WjsClyaGqANdqWJKpAsiqZcSq_9fN4w-ywFMNQmEkjo/edit", "doc"],
              ["Developing Good Research Questions", "https://www.youtube.com/watch?v=3YHv3vFJMG0", "vid"],
              ["How to Develop Strong Research Questions", "https://www.youtube.com/watch?v=71-GucBaM8U", "vid"]]},
    {d:7, iso:"2027-02-09", topic:"Bias", num:"1.5",
      note:D("1lxQjykrdsd2v428T3bUxuybfeGjHOfaC"),
      ans:"", /* key: D("1NaBU-fjQoVEziiM8Y5-J6hAg9BZCGWtK") */
      extras:[["Types of Bias (Broken Down More)", "https://www.youtube.com/watch?v=CMa-Y5KSz1A", "vid"],
              ["Every Bias Explained in 8 Minutes", "https://www.youtube.com/watch?v=8SbV1jN12RY", "vid"]]},
    {d:8, iso:"2027-02-10", topic:"Big Data Debate · Careers in Data",
      extras:[["Big Data Debate (slides)", "https://docs.google.com/presentation/d/1ReCqZIiO_Q4jevfMtGjf_Sj7pHa8EOnchYeLfeeMa7Y/edit", "doc"],
              ["Ethical Challenges of Big Data", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7819582/", "doc"],
              ["Google Trends", "https://trends.google.com/trends/", "doc"]]},
    {d:9, iso:"2027-02-11", topic:"Surveys & Results: Graphing Your Responses",
      extras:[["Survey Assignment", "https://docs.google.com/document/d/1izlGAPhg39Cqoqhp7u8YRcoBLsGz7FjQGkFpEvkNmCk/edit", "doc"],
              ["Graph Exemplars", "https://docs.google.com/document/d/1O0S_iEi48hJfTl981BquiKwgQZf3VJJI9AhwouPFGow/edit", "doc"]]},
    {d:10, iso:"2027-02-12", topic:"Validity", num:"1.6",
      note:D("1M5fszuPe0CLNZ2iygKrT6qZ69_D__FfA"),
      ans:"", /* key: D("1YlT_pEneRLD4EK3ETrD9wNZx6rUlT8bc") */
      extras:[]},
    {d:11, iso:"2027-02-16", topic:"Practice: Media & Mixed Review",
      extras:[]},
    {d:12, iso:"2027-02-17", flag:"review", topic:"Unit 1 Review", noteLabel:"Unit 1 Review",
      note:"https://docs.google.com/document/d/1Zn9gyjSlnMII0_LecYfrW7cRhCxRWNBihJsRgPYZD90/edit",
      ans:"", /* key: "https://docs.google.com/document/d/1qv2P0F0FSUrR40ieHLoM-s91ISGCE-ar7H3td2ZXbLQ/edit" */
      extras:[]},
    {d:13, iso:"2027-02-18", flag:"test", covers:"Unit 1", topic:"",
      extras:[]},
  ]},

  /* ── ONE-VARIABLE STATISTICS ─────────────────────────────── */
  {name:"One-Variable Statistics", days:[
    {d:14, iso:"2027-02-19", topic:"Measures of Central Tendency", num:"2.1",
      note:D("1z0RhNTOqjpB7RYLm2myv5ygIcVVUAGxc"),
      ans:"", /* key: D("1tJlotdw3qYNPIb_O69NESQlh9URJAbnv") */
      extras:[["Textbook Ch 6", "https://drive.google.com/file/d/1qEnBmoRPvm51DHHn3xdsZGFBVDOiklNt/view", "doc"],
              ["Measures of Central Tendency", "https://www.youtube.com/watch?v=AdH5vfobH5E", "vid"]]},
    {d:15, iso:"2027-02-22", topic:"Measures of Spread", num:"2.2",
      note:D("1kPiCNyDr46mKzmrV-9SU5GMB_jaXUjck"),
      ans:"", /* key: D("1nEx6jdRd40CTbGrsGqlhhHzpfEiio5yr") */
      extras:[]},
    {d:16, iso:"2027-02-23", topic:"Standard Deviation", num:"2.3",
      note:D("1muOavC_MCXvaVLqnuZPF-nojXWHkJJIo"),
      ans:"", /* key: D("1yB_t31b_zToz06iJ1S9W4jtSi9b8OT5N") */
      extras:[["Standard Deviation", "https://www.youtube.com/watch?v=MRqtXL2WX2M", "vid"]]},
    {d:17, iso:"2027-02-24", topic:"z-Scores & Percentiles", num:"2.4",
      note:D("16fuxytp5kVdIoFCiw1JcoC7OnRbCpqqx"),
      ans:"", /* key: D("1HO7AvjBqwj_AvV61P4-RNLbP7vhDhmJO") */
      extras:[["Extra Practice", D("1uhgDh_ceTm1f0UPeBiGJl6CvwctKfogm"), "doc"],
              ["Answers", D("1m4xxhmMkP5zGvj7Hmmuq0Mg2vrzQDQ8-"), "ans"]]},
    {d:18, iso:"2027-02-25", topic:"Statistics in Sheets", num:"2.5",
      note:D("1LmcSv7HZF9p2LStrfXGtPVlb7dalNajX"),
      ans:"", /* key: D("1N4rKQqnfiapYYe0gwdqSWOA2YgXvR4b5") */
      extras:[["Data for Today’s Note (make a copy)", "https://docs.google.com/spreadsheets/d/1WUWvz1NgACvQR5JLVSPxmHQLtSGJacxO5KscifwkrWg/copy", "doc"],
              ["Using Sheets & Desmos", "https://www.youtube.com/watch?v=w7KHqf8FHwE", "vid"]]},
    {d:19, iso:"2027-02-26", topic:"Height Assignment (work period)",
      extras:[["Height Assignment", D("1yn85zF2B_a0ghDOczDAdEOO7Ta0IXd3c"), "doc"],
              ["Height Survey (form)", "https://docs.google.com/forms/d/1k-c4zpYpdD4TT9QRK6IvDKy3VDALPhFzifN-PmyICvM/viewform", "doc"]]},
    {d:20, iso:"2027-03-01", topic:"Interpreting Summaries", num:"2.6",
      note:D("1_Z14Zh5VZTDxw2YmHouXHyZiHUx8IFM7"),
      ans:"", /* key: D("1ssf2_lgBJpdE6YLUswGJ5L7qLR2LVDTd") */
      extras:[["Talent Show Example (make a copy)", "https://docs.google.com/spreadsheets/d/194nrio9MHDYYZZUrDu34g9UtT87S_27fVy79WMJXhZA/copy", "doc"]]},
    {d:21, iso:"2027-03-02", flag:"review", topic:"Unit 2 Review", noteLabel:"Unit 2 Review",
      note:D("1FV9ThwxZIt9Woa0hdLWzK3gNaOSmdXH7"),
      ans:"", /* key: D("1N5d9RlQtBsIl17BI3hjjiX07uDVjlbXL") */
      extras:[["Formula Sheet (given on the test)", D("11a8B81svyLzqdBTX_Nc3dJDQ4YTkZNYG"), "doc"]]},
    {d:22, iso:"2027-03-03", flag:"test", covers:"Unit 2", topic:"",
      extras:[]},
  ]},

  /* ── TWO-VARIABLE STATISTICS ─────────────────────────────── */
  {name:"Two-Variable Statistics", days:[
    {d:23, iso:"2027-03-04", topic:"Scatter Plots & Correlation", num:"3.1",
      note:D("1a6s1hZVEaUhID3y9M70OmEwjR6upYSSH"),
      ans:"", /* key: D("1yRg9qo__1xx_Nq2fD1QR0SgVtPh70edv") */
      extras:[["Yield vs Temp (make a copy)", "https://docs.google.com/spreadsheets/d/1J4w3nXzCzspMfwqq0RJYPNkZZ9AKH_bWm6PRzX_8Vas/copy", "doc"],
              ["Scatter Plots, Association, and Correlation", "https://www.youtube.com/watch?v=AxY7nTkgR6M", "vid"]]},
    {d:24, iso:"2027-03-05", topic:"The Correlation Coefficient", num:"3.2",
      note:D("1lSOS_QIlXck8CqcdWjY99FZgxnhdtZ7n"),
      ans:"", /* key: D("1EEYUnU-lZww1lWcb4HQfC7SJdjDNfd9j") */
      extras:[["Yield vs Temp on Desmos", "https://www.desmos.com/calculator/uwfrtx02ev", "doc"]]},
    {d:25, iso:"2027-03-08", topic:"Linear Regression", num:"3.3",
      note:D("1_SyarMA5imduBNG4PMcAJwgGsuh_rl4v"),
      ans:"", /* key: D("1f5orCYVaGs_-t07HFjPy9MhKzbANsgvh") */
      extras:[["Linear Regression Clearly Explained", "https://www.youtube.com/watch?v=7ArmBVF2dCs", "vid"]]},
    {d:26, iso:"2027-03-09", topic:"Cause & Effect", num:"3.4",
      note:D("16kuSReIeZ4MB11hrd277yjc04XijeqKJ"),
      ans:"", /* key: D("18CBP9TxUE3n0C3toFENT-xFcyzuoAKzM") */
      extras:[["Simpsons Clip", "https://www.youtube.com/watch?v=EiUcY4dECqA", "vid"]]},
    {d:27, iso:"2027-03-10", topic:"Residuals & Outliers", num:"3.5",
      note:D("1Eqm599SyoYS1qpRmaHEF5BhbN_EHR8DX"),
      ans:"", /* key: D("1UxGHLB8FnryQNWI2lCtePALo3V4hKDxt") */
      extras:[["Residuals in Sheets (make a copy)", "https://docs.google.com/spreadsheets/d/1FkNi_fi7dIGyA1mkVA7ozrIsAmjLbHApGW7g3Ow6YFY/copy", "doc"],
              ["Answers", "https://docs.google.com/spreadsheets/d/1li0qEEHvl3ubNt1I2dAUyaWjENDt2n2j13UhpFLOq48/edit", "ans"],
              ["Data for Today’s Note (make a copy)", "https://docs.google.com/spreadsheets/d/1QYULjPeZYOASfpZ_z2i1BCQgKhOnOAkG7TlA3sF9OyI/copy", "doc"],
              ["Answers", "https://docs.google.com/spreadsheets/d/11r5c5j5QC8bV2qf1AuGqWKiDRnDb0-jnz9cIJqM4pRk/edit", "ans"]]},
    {d:28, iso:"2027-03-11", topic:"Stats Project: Method & Analysis Plan · Comparing Two Data Sets",
      extras:[["Statistics Project", "https://docs.google.com/document/d/1THkHaMVSkWEll_yCA4KC2URW2V9PK2aMS1OERWIDjQ0/edit", "doc"],
              ["Report Rubric", D("19TCOJNLq9nsS1_J9uUiTAI531lR3ecE9"), "doc"]]},
    {d:29, iso:"2027-03-12", topic:"Data Analysis Assignment",
      extras:[["Data Analysis Assignment", D("1DR7bKvC5NCzvuS9QkNFM0Q2ZH0tufMm7"), "doc"]]},
    {d:30, iso:"2027-03-22", flag:"review", topic:"Unit 3 Review · Practice Test", noteLabel:"Unit 3 Review",
      note:D("1rfMAguzFLmnwjSqhqpSZ7PNZBO3OoDk9"),
      ans:"", /* key: D("1CWffKG_f2pogp3lglyuYFQGiqSqkSCFr") */
      extras:[["Formula Sheet (given on the test)", D("11jGq_todS0ItcN0BG-F95MjPEPCM-w-5"), "doc"]]},
    {d:31, iso:"2027-03-23", flag:"test", covers:"Unit 3", topic:"",
      extras:[]},
  ]},

  /* ── STATISTICS PROJECT ──────────────────────────────────── */
  {name:"Statistics Project", noNumber:true, days:[
    {d:32, iso:"2027-03-24", topic:"Stats Project: Data Collection & Analysis",
      extras:[["Statistics Project", "https://docs.google.com/document/d/1THkHaMVSkWEll_yCA4KC2URW2V9PK2aMS1OERWIDjQ0/edit", "doc"],
              ["Statistics Canada", "https://www.statcan.gc.ca/en/start", "doc"],
              ["UNESCO Database", "http://data.uis.unesco.org/", "doc"]]},
    {d:33, iso:"2027-03-25", topic:"Stats Project: Analysis",
      extras:[]},
    {d:34, iso:"2027-03-30", topic:"Stats Project: Peer Review",
      extras:[]},
    {d:35, iso:"2027-03-31", topic:"Stats Project: Report Writing",
      extras:[["Report Rubric", D("19TCOJNLq9nsS1_J9uUiTAI531lR3ecE9"), "doc"]]},
  ]},

  /* ── STATISTICS EXAM ─────────────────────────────────────── */
  {name:"Statistics Exam", noNumber:true, days:[
    {d:36, iso:"2027-04-01", flag:"review", topic:"Statistics Exam Review: Units 1–3",
      extras:[]},
    {d:37, iso:"2027-04-02", flag:"exam", covers:"Statistics, Units 1–3", topic:"",
      extras:[]},
  ]},

  /* ── BASIC PROBABILITY ───────────────────────────────────── */
  {name:"Basic Probability", days:[
    {d:38, iso:"2027-04-05", topic:"Introduction to Probability", num:"4.1",
      note:D("1V8rgB0sxHdtnAVPaWY8tqB0gG53nYl3Z"),
      ans:"", /* key: D("1suvFueqRkzPYJq9Xx5nVz3O87VEQhp4M") */
      extras:[["Basic Probability", "https://www.youtube.com/watch?v=KzfWUEJjG18", "vid"]]},
    {d:39, iso:"2027-04-06", topic:"Theoretical Probability", num:"4.2",
      note:D("1El5wn84KQX2vyMfCx3INFjKmhEzJ-SC-"),
      ans:"", /* key: D("16jwPbp3f-zAm65UE8THSoS0c2gkzj9kN") */
      extras:[["The Last Banana: Theoretical Probability", "https://www.youtube.com/watch?v=Kgudt4PXs28", "vid"]]},
    {d:40, iso:"2027-04-07", topic:"Experimental Probability", num:"4.3",
      note:D("1d-4smVDGq1pu-YIM7bAZK2yCVFsEMiUo"),
      ans:"", /* key: D("17VtcRQ51ZFwQxC7h5mILfpi6tSWpaJqn") */
      extras:[["Spinner Simulation", "https://www.nctm.org/adjustablespinner/", "doc"]]},
    {d:41, iso:"2027-04-08", topic:"Mutually Exclusive Events", num:"4.4",
      note:D("1yyMFH3tRTntHTXtjEgdmcjPZXxR75hd3"),
      ans:"", /* key: D("1a7aRte5WkwLNmUpJMxRVZxRnVevG8b_q") */
      extras:[["Mutually Exclusive with Venn Diagrams", "https://www.youtube.com/watch?v=X6usGgwXFyU", "vid"]]},
    {d:42, iso:"2027-04-09", topic:"Independent & Dependent Events", num:"4.5",
      note:D("1lK2qUDxn1pFmDL-MWk4aPXvn-Yw4p7af"),
      ans:"", /* key: D("1DUtd5k2HNonrOXCUlU36YGcPmrqUfOMy") */
      extras:[["Independent vs Dependent Events", "https://www.youtube.com/watch?v=LS-_ihDKr2M", "vid"],
              ["Mutually Exclusive vs Independent Events", "https://www.youtube.com/watch?v=aVqmWW3xmdU", "vid"]]},
    {d:43, iso:"2027-04-12", flag:"pquiz", covers:"4.1–4.5", topic:"",
      extras:[]},
    {d:44, iso:"2027-04-13", topic:"Conditional Probability", num:"4.6",
      note:D("1Ep3bjP10-_QQBfP8nKmeQPlXsvXXG3F3"),
      ans:"", /* key: D("1YWiC4KRBPYIYhMxQA_2M1QR-EhRXOBoU") */
      extras:[["The Bayesian Trap", "https://www.youtube.com/watch?v=R13BD8qKeTg", "vid"],
              ["Conditional Probability Explained", "https://www.youtube.com/watch?v=ibINrxJLvlM", "vid"],
              ["Bayes & Changing Beliefs", "https://www.youtube.com/watch?v=HZGCoVF3YvM", "vid"]]},
    {d:45, iso:"2027-04-14", topic:"Two-Way Tables", num:"4.7",
      note:D("1_E1t1ABpkPWtN7CiwrO8sPCm4PXvrTRw"),
      ans:"", /* key: D("1LgevOUXQZdAm48ngSDmH1hqVXFci0Zsq") */
      extras:[]},
    {d:46, iso:"2027-04-15", flag:"review", topic:"Unit 4 Review", noteLabel:"Unit 4 Review",
      note:D("1IriSpJZLGlXWYnJPIxprCRROS0xr3hxk"),
      ans:"", /* key: D("1nu_EQKY4sGaDHb9FMUcY-bHPIE5HBtPV") */
      extras:[["Formula Sheet (given on the test)", D("1diSd0VJm6dsGETL-tD_CNfDt111NB_3u"), "doc"]]},
    {d:47, iso:"2027-04-19", flag:"test", covers:"Unit 4", topic:"",
      extras:[]},
    {d:48, iso:"2027-04-20", topic:"Stats Presentations: Poster Session",
      extras:[["Presentation Notes", "https://docs.google.com/document/d/1s77xbZ5qwx0TsPMpf1lirlBihePfyXgh1gs-HHwV7Ow/edit", "doc"],
              ["Presentation Rubric", "https://docs.google.com/document/d/1R1wIOFMw6lSTsKQJz_fnnXErX1sKrRx_oW9F0ueGZCU/edit", "doc"]]},
    {d:49, iso:"2027-04-21", topic:"Stats Presentations · Critique Responses",
      extras:[]},
  ]},

  /* ── COMBINATORICS ───────────────────────────────────────── */
  {name:"Combinatorics", days:[
    {d:50, iso:"2027-04-22", topic:"Organized Counting", num:"5.1",
      note:D("1brkma6cV3VFvH0-rNimEX6Sp65Grb96B"),
      ans:"", /* key: D("1Z18lhgHNdIsWtt97_Owj5hAJLTRIFouM") */
      extras:[["Addition & Multiplication Principles", "https://www.youtube.com/watch?v=yTsbGglDo04", "vid"]]},
    {d:51, iso:"2027-04-23", topic:"Fundamental Counting Principle", num:"5.2",
      note:D("1j6NUl2jEuHTA1y2VJIXDjoxdaxWyiior"),
      ans:"", /* key: D("14ZaGUL0MRFfIHE_MrSXxLLBvWNNmNBLj") */
      extras:[["Fundamental Counting Principle", "https://www.youtube.com/watch?v=3lmEqp8VhAU", "vid"]]},
    {d:52, iso:"2027-04-26", topic:"Factorials & Permutations", num:"5.3",
      note:D("1MzKD6qibHTIULMbr1TyepX-3V9hpNmPM"),
      ans:"", /* key: D("1vE3w4M2I_-Xq6djLEFqkiuCDDCB4g7MW") */
      extras:[["From Factorials to Permutations", "https://www.youtube.com/watch?v=tkhyQXqVxWA", "vid"]]},
    {d:53, iso:"2027-04-27", topic:"Rule of Sum and Product", num:"5.4",
      note:D("1gU-gnaAkS-tfOlTA41gG1_t-KH02JmTQ"),
      ans:"", /* key: D("1EJv61Dd5GmK9AFBhO3YQ0PTxz89DYt04") */
      extras:[["Rules of Sum and Product", "https://www.youtube.com/watch?v=8JiWWvEoaoc", "vid"],
              ["Extension: Inclusion-Exclusion and Derangements", D("1SsB9K6cmxjJJ75gQ8_isf9xIsAd-Ik0E"), "doc"],
              ["Answers", D("1ciFlc64R217Pl6brKAyoCnshje6nG55A"), "ans"]]},
    {d:54, iso:"2027-04-28", topic:"Reading a Counting Question", num:"5.5",
      note:D("1kWA69So7Wddan4fnO6O6BYwsRo-h7Ita"),
      ans:"", /* key: D("1F7M3kB-K6bI5Yir44OXkJtJby9PpTpDM") */
      extras:[["Extension: Identical Objects and Circles", D("1TI03D8SVeAwBeiIdzy8-cuK1kNMAOAih"), "doc"],
              ["Answers", D("1_hyTW8zMelyCP4S57wQVO5-Ewv_ycY4S"), "ans"]]},
    {d:55, iso:"2027-04-29", flag:"quiz", covers:"5.1–5.5", topic:"",
      extras:[["Counting Practice", D("1neVBZCRfXzqaPbWDvftODrQGgnVuDzlS"), "doc"]]},
    {d:56, iso:"2027-04-30", topic:"Combinations", num:"5.6",
      note:D("1Jv0xH-V10acM6YviF3gZXgvhlhP7AfOf"),
      ans:"", /* key: D("1w9Yg92JvwGgTDjbSmOLFu1tGQcu2-wIG") */
      extras:[["Permutations vs Combinations", "https://www.youtube.com/watch?v=iKy-d5_erhI", "vid"]]},
    {d:57, iso:"2027-05-03", topic:"Problem Solving with Combinations", num:"5.7",
      note:D("1PG-n3v9BsswFWsdCfNqmqGt_wbjAnDv4"),
      ans:"", /* key: D("1OiDsE0YlD38X7NvhjIezTGiQPIK5Ug_H") */
      extras:[["Solving Combinatorics Word Problems", "https://www.youtube.com/watch?v=0AYjOu77u3Q", "vid"]]},
    {d:58, iso:"2027-05-04", topic:"Pascal’s Triangle", num:"5.8",
      note:D("1nmhuvgNDcSqcqWpFD04TOR-3iku3sRHW"),
      ans:"", /* key: D("1t1Qb7ET10ojdtyJmCtRRY0ewbdB3wDxN") */
      extras:[["Extension: The Binomial Theorem", D("1-9CO68mgISTxUt4f4DZgSGRWXo04SAPa"), "doc"],
              ["Answers", D("1kPjVFyT1sJhsPbAAWgQOc2ZUYL34p8Jh"), "ans"],
              ["Extension: Distributions and Lattice Paths", D("1P0SdHV_vfRJljC3GnQESbwFvhz9RZCcr"), "doc"],
              ["Answers", D("1832XfMWX0yA3WdJOcV6tqk_bGvH1DDuv"), "ans"]]},
    {d:59, iso:"2027-05-05", topic:"Probability with Combinations", num:"5.9",
      note:D("1qnZUv9Lnnsq4di9AHUAsYtUve8v5XT2s"),
      ans:"", /* key: D("1mkHsfIL3DMAQ2CH1L5yQ2oeuOssXSuSV") */
      extras:[["Permutations, Combinations, & Probability", "https://www.youtube.com/watch?v=tnF9f3zCCKI", "vid"]]},
    {d:60, iso:"2027-05-06", flag:"quiz", covers:"5.6–5.9", topic:"",
      extras:[["Counting Practice", D("1neVBZCRfXzqaPbWDvftODrQGgnVuDzlS"), "doc"]]},
    {d:61, iso:"2027-05-07", flag:"review", topic:"Unit 5 Review",
      extras:[["Play Combinatorics Connections", "https://mathbrown.com/Combinatorics-Connections/", "doc"],
              ["All of Combinatorics in 30 Mins", "https://www.youtube.com/watch?v=VJkvPTY6kZw", "vid"],
              ["A Combinatorics Problem That May Get You Thinking", "https://www.youtube.com/watch?v=CLN5zMVgD90", "vid"]]},
    {d:62, iso:"2027-05-10", flag:"test", covers:"Unit 5", topic:"",
      extras:[]},
  ]},

  /* ── PROBABILITY DISTRIBUTIONS ───────────────────────────── */
  {name:"Probability Distributions", days:[
    {d:63, iso:"2027-05-11", topic:"Probability Distributions & Expected Value", num:"6.1",
      note:D("1KoBiGd7bkb7z92ZeUeOFtHEDTyoSxx7r"),
      ans:"", /* key: D("1X55204nfyH-CdvhgQV1B1goGp89knukA") */
      extras:[["The Main Idea Behind Probability Distributions", "https://www.youtube.com/watch?v=oI3hZJqXJuc", "vid"]]},
    {d:64, iso:"2027-05-12", topic:"Uniform Distributions", num:"6.2",
      note:D("1tvydFTI4ziGyNBc8vEjBPZA1bydthtMU"),
      ans:"", /* key: D("1a7nzoHhg1xmOdWJu_hejJudWOMw1cpnC") */
      extras:[["How to Learn Probability Distributions", "https://www.youtube.com/watch?v=mBCiKUzwdMs", "vid"]]},
    {d:65, iso:"2027-05-13", topic:"Binomial Distributions", num:"6.3",
      note:D("1xnoGachPtsGxYf00eRB_oclpC79XIyxx"),
      ans:"", /* key: D("1jqzlbSj6FwN3qWmBi3gHcE4C1xqLBRZi") */
      extras:[["Buying the Best Product", "https://www.youtube.com/watch?v=8idr1WZ1A7Q", "vid"]]},
    {d:66, iso:"2027-05-14", topic:"Problem Solving with Binomial Distributions", num:"6.4",
      note:D("1ZiqG_OlQVDF9sSN8j7Xi4fjwJbCHXT26"),
      ans:"", /* key: D("1UHwoszOZoFnkBjdsH5m1oQYCTkMk2iCB") */
      extras:[]},
    {d:67, iso:"2027-05-17", topic:"Hypergeometric Distributions", num:"6.5",
      note:D("1HqeOJP00juwadOX4erwXds4lA2QLdd_p"),
      ans:"", /* key: D("1hPPIMfUWOsT4Ljuqp6Bm3pZaN6xXaKGD") */
      extras:[["The Hypergeometric Probability Distribution", "https://www.youtube.com/watch?v=uzN7U88KSx8", "vid"]]},
    {d:68, iso:"2027-05-18", topic:"Choosing the Distribution", num:"6.6",
      note:D("1Gg2O-f4HODiI126yubNe8K61Meu-90RZ"),
      ans:"", /* key: D("1_-5dQ9BTfE-yxiTeRkPKK4vSgneiQvyL") */
      extras:[["Geometric Distributions & the Birthday Paradox", "https://www.youtube.com/watch?v=5VMTeBoEcQg", "vid"]]},
    {d:69, iso:"2027-05-19", topic:"Comparing Distributions", num:"6.7",
      note:D("11wxQ-qBXkUBelYOVioMUCPsbqD8mUIRV"),
      ans:"", /* key: D("1k-gxSfJwdjxeU0lFUU_CTwUxKa491fOI") */
      extras:[]},
    {d:70, iso:"2027-05-20", flag:"quiz", covers:"6.1–6.7", topic:"",
      extras:[]},
    {d:71, iso:"2027-05-21", topic:"Continuous Random Variables", num:"6.8",
      note:D("1ifO3MyF2KT5nEHKe0a_5nh7u3BD---e9"),
      ans:"", /* key: D("1KKZEEfsP41rwO5uk9pRSzSStULGyOvvj") */
      extras:[["Understanding Continuous Random Variables", "https://www.youtube.com/watch?v=UVQs9zikfe0", "vid"]]},
    {d:72, iso:"2027-05-25", topic:"The Normal Distribution", num:"6.9",
      note:D("11VOcNO-X_Ca78wz5ztCPvDl2bs9HmfU4"),
      ans:"", /* key: D("1OKeOZjGO45WoTjZJZEDiXewJLPHmzmTH") */
      extras:[["z-Score Table", D("175XiBVONmfEZKHCnPISIc16LZjPq6w-D"), "doc"],
              ["The Normal Distribution Clearly Explained", "https://www.youtube.com/watch?v=rzFX5NWojp0", "vid"],
              ["Normal Distribution Using Tables", "https://www.youtube.com/watch?v=xI9ZHGOSaCg", "vid"]]},
    {d:73, iso:"2027-05-26", topic:"Normal Applications", num:"6.10",
      note:D("11CHIDRTjG-d-976bEC1JOY9YyhsOwLo2"),
      ans:"", /* key: D("1HmeUyK2PYnw2ZU9mKYwgU5i1vJ3SD6FV") */
      extras:[["z-Score Table", D("175XiBVONmfEZKHCnPISIc16LZjPq6w-D"), "doc"],
              ["Normal Distribution (PDF, CDF, PPF) in 3 Minutes", "https://www.youtube.com/watch?v=3VYupIsbLlY", "vid"]]},
    {d:74, iso:"2027-05-27", topic:"Modelling with the Normal", num:"6.11",
      note:D("1zvYWOlX_JCticIFBiex5mipW19cgAk00"),
      ans:"", /* key: D("118_CEcnC7wCqIZI6-yE-096Ny-3DptD-") */
      extras:[["Sampling From a Normal Distribution Clearly Explained", "https://www.youtube.com/watch?v=XLCWeSVzHUU", "vid"]]},
    {d:75, iso:"2027-05-28", topic:"Connections to Discrete", num:"6.12",
      note:D("1MSCr6yxmUYnanrCtG394b1uqBt0J0InW"),
      ans:"", /* key: D("1cHfK_y-83u4YHYD-5kQKODa343dNh9dQ") */
      extras:[["But What is the Central Limit Theorem?", "https://www.youtube.com/watch?v=zeJD6dqJ5lo", "vid"]]},
    {d:76, iso:"2027-05-31", flag:"quiz", covers:"6.8–6.12", topic:"",
      extras:[]},
    {d:77, iso:"2027-06-01", topic:"Margin of Error and Confidence", num:"6.13",
      note:D("1k0t6kNMQ_40RAS3w5NVbj2MDDloIPvA3"),
      ans:"", /* key: D("1tCVLBrjL6wkrm_RU-RgpLkkqh6mSbsi8") */
      extras:[["REWATCH: Why Most Published Research is Wrong", "https://www.youtube.com/watch?v=42QuXLucH3Q", "vid"]]},
    {d:78, iso:"2027-06-02", topic:"Carnival Planning",
      extras:[["Carnival Games", "https://docs.google.com/document/d/1Byo2gCKfcm3Ht9BSa9QAR_Si8FmyzUKJ9pHwF3x9qAI/edit", "doc"],
              ["Carnival Rubric", "https://docs.google.com/document/d/1TI8Cy9Q01PVRxVX7688bVrjtL0f_qe-g3lixvpf65XQ/edit", "doc"]]},
    {d:79, iso:"2027-06-03", flag:"review", topic:"Unit 6 Review", noteLabel:"Unit 6 Review",
      note:D("1dP1tW5DtHdZ5ABFwBD-c-RF-RvKAHTx6"),
      ans:"", /* key: D("10ADOoEDjuWjbPRosKq_47tYGyHR1OoXa") */
      extras:[["Formula Sheet (given on the test)", D("10GZk09r4FLP1TocWdLpXVvPP9vQhaez7"), "doc"],
              ["z-Score Table", D("175XiBVONmfEZKHCnPISIc16LZjPq6w-D"), "doc"]]},
    {d:80, iso:"2027-06-04", flag:"test", covers:"Unit 6", topic:"",
      extras:[]},
  ]},

  /* ── CARNIVAL ────────────────────────────────────────────── */
  {name:"Carnival", noNumber:true, days:[
    {d:81, iso:"2027-06-07", topic:"Carnival Setup",
      extras:[["Carnival Games", "https://docs.google.com/document/d/1Byo2gCKfcm3Ht9BSa9QAR_Si8FmyzUKJ9pHwF3x9qAI/edit", "doc"]]},
    {d:82, iso:"2027-06-08", topic:"Carnival!",
      extras:[]},
    {d:83, iso:"2027-06-09", topic:"Carnival Report Writing",
      extras:[["Carnival Rubric", "https://docs.google.com/document/d/1TI8Cy9Q01PVRxVX7688bVrjtL0f_qe-g3lixvpf65XQ/edit", "doc"]]},
  ]},

  /* ── EXAM REVIEW ─────────────────────────────────────────── */
  {name:"Exam Review", noNumber:true, days:[
    {d:84, iso:"2027-06-10", topic:"Exam Review: Basic Probability",
      extras:[]},
    {d:85, iso:"2027-06-11", topic:"Exam Review: Counting & Distributions",
      extras:[]},
    {d:86, iso:"2027-06-14", topic:"Practice Exam",
      extras:[]},
    {d:87, iso:"2027-06-15", topic:"Practice Exam Take-Up",
      extras:[]},
    {d:88, iso:"2027-06-16", topic:"Last Class · Exam Prep",
      extras:[]},
  ]},

  ],
};
