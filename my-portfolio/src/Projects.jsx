import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import loginImage from '../../frontend/src/assets/image/Screenshot 2026-10-18 001543.png'
import adminDashboardImage from '../../frontend/src/assets/image/admin-dash.png'
import facultyAssignmentImage from '../../frontend/src/assets/image/Screenshot 2026-10-28 131046.png'
import evaluationResultsImage from '../../frontend/src/assets/image/Screenshot 2026-10-28 131111.png'
import auditLogsImage from '../../frontend/src/assets/image/Screenshot 2026-10-28 131122.png'
import projectPlaceholderImage from '../../frontend/src/assets/image/project-bg.png'
import technoRegistrationImage from '../../frontend/src/assets/image/techno.png'
import technoHomeImage from '../../frontend/src/assets/image/techno2.png'
import technoVenueImage from '../../frontend/src/assets/image/tecno3.png'
import technoProgramImage from '../../frontend/src/assets/image/techno4.png'
import technoAboutImage from '../../frontend/src/assets/image/techno5.png'

const projects = [
  {
    id: 'teacher-evaluation',
    number: '001',
    title: 'Teacher Evaluation System',
    summary: 'A web platform for managing teacher evaluations, academic terms, and role-based portal experiences.',
    type: 'Full-Stack Web Application',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js', 'MySQL'],
    demo: 'https://capstone-teacher-evaluation-git-evalutioncapstone-suneoows.vercel.app/',
    demoCredentials: [
      { role: 'Admin', email: 'admin pokess@gmail.com', password: '12345678A' },
      { role: 'Student', email: 'student@gmail.com', password: '12345678A' },
      { role: 'Teacher', email: 'teacher@gmail.com', password: '12345678A' },
    ],
    screenshots: [
      { image: loginImage, title: 'Login Page', description: 'The login page gives teachers and administrators a secure way to access the Teacher Evaluation System.' },
      { image: adminDashboardImage, title: 'Admin Dashboard', description: 'The admin dashboard gives administrators an overview of the system and quick access to evaluation management tools.' },
      { image: facultyAssignmentImage, title: 'Faculty Assignment', description: 'Administrators can assign faculty members to evaluation groups and manage their evaluation responsibilities.' },
      { image: evaluationResultsImage, title: 'Evaluation Results', description: 'The results page helps administrators review submitted teacher evaluations and their recorded outcomes.' },
      { image: auditLogsImage, title: 'Audit Logs', description: 'The audit logs show system activity so administrators can review important actions and changes.' },
    ],
  },
  {
    id: 'technova-2026',
    number: '002',
    title: 'TechNova 2026',
    summary: 'A student innovation summit website with event information, program details, venue guidance, and registration.',
    type: 'Responsive Event Website',
    technologies: [],
    screenshots: [
      { image: technoRegistrationImage, title: 'Registration', description: 'A registration form for attendees to enter personal and academic information and choose summit sessions.' },
      { image: technoHomeImage, title: 'Home Page', description: 'The landing page introduces TechNova 2026 and links visitors to registration and the event program.' },
      { image: technoVenueImage, title: 'Venue & Resource Guide', description: 'The venue page helps participants find event areas, session rooms, and campus contact information.' },
      { image: technoProgramImage, title: 'Program & Sessions', description: 'The program page presents the summit schedule, tracks, speakers, and rooms.' },
      { image: technoAboutImage, title: 'About TechNova', description: 'The about page explains the summit background, mission, objectives, and key terms.' },
    ],
  },
]

function ProjectModal({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const screenshot = project.screenshots[activeIndex]
  const count = project.screenshots.length

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
      if (count > 1 && event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % count)
      if (count > 1 && event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count, onClose])

  function goTo(index) {
    setActiveIndex((index + count) % count)
  }

  return (
    <div className="modal is-open" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby={`${project.id}-title`}>
        <button className="close-btn" type="button" onClick={onClose} aria-label="Close project details">&times;</button>
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-8">
              {screenshot ? (
                <div className="project-coverflow" aria-label={`${project.title} screenshots`}>
                  <div className="carousel-inner">
                    {project.screenshots.map((slide, index) => {
                      const previous = (activeIndex - 1 + count) % count
                      const next = (activeIndex + 1) % count
                      const state = index === activeIndex ? 'active' : index === previous ? 'coverflow-prev' : index === next ? 'coverflow-next' : 'coverflow-hidden'
                      return <button className={`carousel-item ${state}`} key={slide.image} type="button" aria-hidden={index !== activeIndex} tabIndex={index === activeIndex ? 0 : -1} onClick={() => goTo(index)}>
                        <img src={slide.image} alt={slide.title} />
                      </button>
                    })}
                  </div>
                  <div className="carousel-indicators" aria-label="Choose screenshot">
                    {project.screenshots.map((slide, index) => <button key={slide.image} type="button" data-slide-to={index} className={index === activeIndex ? 'active' : ''} aria-label={`Show ${slide.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goTo(index)} />)}
                  </div>
                  <button className="carousel-control-prev" type="button" aria-label="Previous image" onClick={() => goTo(activeIndex - 1)}><span className="carousel-control-prev-icon" /></button>
                  <button className="carousel-control-next" type="button" aria-label="Next image" onClick={() => goTo(activeIndex + 1)}><span className="carousel-control-next-icon" /></button>
                </div>
              ) : <div className="project-modal-placeholder">Project details will be added soon.</div>}
            </div>
            <div className="col-12 col-md-4">
              <div className="modal-text">
                <small className="project-label">PROJECT / {project.number}</small>
                <h2 id={`${project.id}-title`}>{screenshot?.title ?? project.title}</h2>
                <p className="project-type">{project.type}</p>
                <p>{screenshot?.description ?? project.summary}</p>
                {project.technologies.length > 0 && <>
                  <h5>Technologies</h5>
                  <div className="d-flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div>
                </>}
              </div>
              {(project.source || project.demo) && <div className="d-flex flex-wrap gap-2 mt-3">
                {project.source && <a href={project.source} className="btn btn-outline-info">View Source</a>}
                {project.demo && <a href={project.demo} className="btn btn-info" target="_blank" rel="noreferrer">Live Demo</a>}
              </div>}
              {project.demoCredentials && <div className="mt-3" aria-label="Demo account credentials">
                <h5>Demo Login</h5>
                {project.demoCredentials.map((account) => <p className="mb-2" key={account.role}>
                  <strong>{account.role}:</strong> {account.email}<br />
                  <strong>Password:</strong> {account.password}
                </p>)}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false)

  return <>
    <div className="col-12 col-md-6">
      <article className="project-card">
        <div className="project-view">
          <img src={project.screenshots[0]?.image ?? projectPlaceholderImage} className="imageview" alt={`${project.title} preview`} />
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <button type="button" className="btn" onClick={() => setIsOpen(true)}>View project</button>
        </div>
      </article>
    </div>
    {isOpen && createPortal(<ProjectModal project={project} onClose={() => setIsOpen(false)} />, document.body)}
  </>
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = projects.length
  const goTo = (index) => setActiveIndex((index + count) % count)

  return <div className="projects-carousel" aria-label="Projects">
    <div className="projects-carousel-track" aria-live="polite">
      {projects.map((project, index) => {
        const isActive = index === activeIndex
        const position = isActive ? 'active' : activeIndex === 0 ? 'next' : 'prev'
        return <div className={`projects-carousel-slide ${position}`} key={project.id} aria-hidden={!isActive} onClick={() => !isActive && goTo(index)}>
          <ProjectCard project={project} />
        </div>
      })}
    </div>
    {count > 1 && <>
      <button className="projects-carousel-control prev" type="button" aria-label="Previous project" onClick={() => goTo(activeIndex - 1)}>&#10094;</button>
      <button className="projects-carousel-control next" type="button" aria-label="Next project" onClick={() => goTo(activeIndex + 1)}>&#10095;</button>
      <div className="projects-carousel-indicators" aria-label="Choose project">
        {projects.map((project, index) => <button key={project.id} type="button" className={index === activeIndex ? 'active' : ''} aria-label={`Show ${project.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goTo(index)} />)}
      </div>
    </>}
  </div>
}
