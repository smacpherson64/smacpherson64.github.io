import { ExperienceVisual } from "./components/ExperienceVisual.tsx";
import { GithubIcon } from "./components/icons/Github.tsx";
import { LinkedInIcon } from "./components/icons/LinkedIn.tsx";
import { SkillVisual } from "./components/SkillVisual.tsx";

const startYear = 2006;
const thisYear = new Date().getFullYear();

const skills: {
  name: string;
  description: string;
  years: [number, number][];
}[] = [
  {
    name: "JavaScript",
    description: "",
    years: [[2006, thisYear]],
  },
  {
    name: "HTML",
    description: "",
    years: [[2006, thisYear]],
  },
  {
    name: "CSS",
    description: "",
    years: [[2006, thisYear]],
  },
  {
    name: "React",
    description: "",
    years: [[2016, thisYear]],
  },
  {
    name: "TypeScript",
    description: "",
    years: [[2017, thisYear]],
  },
  {
    name: "PHP",
    description: "",
    years: [
      [2006, 2013],
      [2014, 2018],
    ],
  },
  {
    name: "iOS (Swift)",
    description: "",
    years: [
      [2016, 2017],
      [2019, 2020],
    ],
  },
  { name: "Android (Kotlin)", description: "", years: [[2019, 2020]] },
  { name: "Bash", description: "", years: [[2006, thisYear]] },
  { name: "Java", description: "", years: [[2013, 2014]] },
  {
    name: "NodeJS",
    description: "",
    years: [[2014, thisYear]],
  },
  { name: "Deno", description: "", years: [[2023, thisYear]] },
  { name: "GraphQL", description: "", years: [[2019, 2021]] },
  {
    name: "Redux",
    description: "RTKQuery, Redux Sagas, Redux Thunks",
    years: [[2017, thisYear]],
  },
  { name: "tailwindcss", description: "", years: [[2019, thisYear]] },
  { name: "Playwright", description: "", years: [[2020, thisYear]] },
  { name: "Jest", description: "", years: [[2018, thisYear]] },
  { name: "VS Code", description: "", years: [[2017, thisYear]] },
  { name: "Git", description: "", years: [[2007, thisYear]] },
  { name: "MongoDB", description: "", years: [[2021, thisYear]] },
  {
    name: "Build tools",
    description:
      "Vite, Webpack, Babel, SWC, ESBuild. Previously: Gulp, Grunt, Create React App, Custom build tools.",
    years: [[2015, thisYear]],
  },
  {
    name: "Dev Tools",
    description:
      "Browser dev tools, React dev tools, Redux dev tools. Previously Firebug.",
    years: [[2007, thisYear]],
  },
  { name: "Figma", description: "", years: [[2019, thisYear]] },
  {
    name: "CMSes",
    description:
      "Previously WordPress, Drupal, CakePHP, Joomla, DotNetNuke, DotCMS, Custom, Google Sheets.",
    years: [[2006, 2018]],
  },
  { name: "MongoDB", description: "", years: [[2021, thisYear]] },
  { name: "MSSQL", description: "", years: [[2017, 2019]] },
  {
    name: "PostgreSQL",
    description: "",
    years: [
      [2013, 2014],
      [2020, 2021],
    ],
  },
  {
    name: "MySQL",
    description: "",
    years: [
      [2006, 2013],
      [2013, 2017],
    ],
  },
];

const experience: {
  title: string;
  business: string;
  range: [number, number];
  description?: string;
  responsibilities?: string[];
  accomplishments?: string[];
}[] = [
  {
    title: "Senior Software Developer",
    business: "Quote Factory",
    range: [2021, thisYear],
    responsibilities: [
      "Develop features from development to deployment.",
      "Investigate and resolve any issues or concerns of customer support.",
      "Develop tools that improve developer experience during development and testing.",
      "Document feature implementations and share knowledge throughout the team.",
      "Educate the team on various React patterns and upcoming changes to dependencies.",
    ],
    accomplishments: [
      "Incrementally implemented an E2E test suite covering the critical parts of the system.",
      "Incrementally improved the codebase through documentation and JSDoc style TypeScript types.",
      "Increased throughput of the design team by implementing a live UI design mockup tool.",
      "Developed various custom UI inputs.",
      "Created a system to auto-generate frontend types from the live javascript backend code.",
    ],
  },
  {
    title: "Software Engineer",
    business: "DMP",
    range: [2018, 2021],
    responsibilities: [
      "Create estimates, develop and deploy features, collaborate with the team, and communicate feedback for various client applications (web and mobile).",
      "Develop tools that improve developer experience during development, testing, and deployment. (web, electron, and mobile)",
      "Refactor legacy codebases to remove technical debt and improve maintainability.",
      "Document feature implementations and share knowledge throughout the team.",
    ],
    accomplishments: [
      "Developed and deployed features that improve ROI for the business and customers.",
      "Developed and maintained a custom CI server to optimally match the internal processes of the business and increase performance of various teams.",
      "Developed internal tools that resemble physical hardware allowing rapid testing and performance improvements.",
      "Regularly participated in sessions about how our team can positively impact the business, customers, and end users.",
      "Setup monorepo and merged multiple clients, including legacy codebases, to allow for client code reuse and better team collaboration.",
      "Proposed and revised ideas that would serve end users needs in the industry.",
    ],
  },
  {
    title: "Senior Web Developer",
    business: "Trip Mate",
    range: [2017, 2018],

    responsibilities: [
      "Develop full features, including all aspects of the stack, for current systems.",
      "Explore, document, explain best front-end practices and tools for all projects.",
      "Estimate front-end requirements for rebuild of critical internal systems.",
      "Communicate with a variety of employees to determine requirements of features for the new system.",
      "Refactor codebases to remove technical debt and improve security.",
      "Discuss, research, and develop resources to allow for automatic deployments.",
    ],
    accomplishments: [
      "Developed a proof of concept platform using React, TypeScript, and Redux, to use with rebuilding internal systems.",
      "Created multiple presentations to explain the new system and how newer JavaScript technologies function.",
      "Documented the new system as well as most internal processes.",
      "Lead a team of three developers to complete a large end user communication feature used for every new claim received for the company.",
    ],
  },
  {
    title: "Developer",
    business: "Barkley / 40Digits",
    range: [2014, 2017],
    responsibilities: [
      "Communicate with all project constituents, external and internal, for every project, informing them on scope, design decisions, progress, and possible ideas.  ",
      "Resolve technical issues by troubleshooting, problem solving, and collaboration.",
      "Translate requirements and designs into fully developed sites, apps, and web apps.",
      "Understand how each project build-system, environment, and codebase functions.",
      "Collaborate with diverse internal and client teams.",
      "Adapt to clients preferred methods of communication and project style.",
    ],
    accomplishments: [
      "Developed templates and functionality for a large range of CMSes.",
      "Developed an underwriter decision making prototype for an international insurance company.",
      "Developed complex UI recipe filters for a database of 1000s of user recipes.",
      "Developed a native iOS app to gamify fan reactions at live NFL games.",
      "Developed a user friendly system for creating customized marketing content for a financial institution.",
      "Implemented and educated clients on analytics strategies unique to their business.",
      "Worked with QA teams to make sure backend and frontend functionality, accessibility, and visual rendering of projects met or exceeded expectations.",
      "Developed and interacted with a wide range of build systems.",
      "Collaborated to build custom open source development tools.",
    ],
  },
  {
    title: "Developer",
    business: "Ethode",
    range: [2013, 2014],
    responsibilities: [
      "Communicate directly with clients to understand their needs and determine requirements, and desired functionality.",
      "Work closely with clients to develop their desired functionality on time and budget.",
    ],
    accomplishments: [
      "Worked independently as the only remote worker on a central team.",
      "Communicated directly with vice presidents and marketing directors to help gauge our partnership and clarify their desired development objectives.",
      "Improve large pre-existing codebases to be responsive and display better on mobile and tablet devices.",
      "Troubleshot and resolved various bugs throughout the tech stack from CSS, JS, and HTML, Velocity or the DotCMS admin, to parts of the Java business logic.",
    ],
  },
  {
    title: "Multiple positions",
    description:
      "Developer / Designer / Help Desk Technician / Campus Support Manager",
    business: "Mission University",
    range: [2012, 2013],
  },
  {
    title: "Technical Pastor",
    business: "First Baptist Church Medina, Ohio",
    range: [2011, 2012],
  },
  {
    title: "Multiple positions",
    description:
      "Developer / Designer / Office of Advancement Assistant / Media Assistant / Sound Technician / Recruiter",
    business: "Mission University",
    range: [2006, 2011],
  },
];

export default function Page() {
  const title = ["sethmac.com"].filter(Boolean).join(" | ");

  return (
    <html lang="en" className="h-full dark:bg-slate-800">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div className="dark:text-gray-300 relative mx-auto container p-8 lg:px-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-16">
          <section className="text-center md:col-span-2 xl:col-span-1">
            <img
              src="/assets/profile.jpg"
              className="rounded-full w-42 h-42 mx-auto my-2 lg:my-8 dark:ring-2 ring-sky-400"
            />

            <div className="font-semibold text-2xl dark:text-sky-400">
              Seth MacPherson
            </div>

            <nav className="flex justify-center gap-3  rounded-lg">
              <a
                href="https://www.linkedin.com/in/sethmac/"
                className="text-sky-400 dark:text-sky-400 w-8"
              >
                {" "}
                <span aria-hidden>
                  <LinkedInIcon />
                </span>
                <span className="sr-only">
                  Seth MacPherson's LinkedIn profile
                </span>
              </a>
              <a
                href="https://github.com/smacpherson64"
                className="text-sky-400 w-8"
              >
                <span aria-hidden>
                  <GithubIcon />
                </span>
                <span className="sr-only">
                  Seth MacPherson's GitHub profile
                </span>
              </a>
            </nav>
          </section>

          <section className="mt-10">
            <header className="font-light text-gray-500 dark:text-slate-600">
              Skills
            </header>

            <ul className="mt-2 flex flex-col gap-2">
              {skills.map((skill) => {
                return (
                  <li key={skill.name}>
                    <SkillVisual {...skill} startYear={startYear} />
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-10">
            <header className="font-light text-gray-500 dark:text-slate-600">
              Experience
            </header>

            <ul className="flex flex-col gap-3 mt-2">
              {experience.map((item, i) => (
                <li key={i}>
                  <ExperienceVisual item={item} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </body>
    </html>
  );
}
