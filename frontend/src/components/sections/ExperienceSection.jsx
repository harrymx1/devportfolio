import React, { useState, useEffect } from 'react';
import { Timeline } from '../ui/Timeline';
import { Link } from 'react-router-dom';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import api from '../../lib/axios';

const Pill = ({ children }) => (
  <HoverBorderGradient
    containerClassName="inline-block"
    className="px-3 py-1 font-mono text-[0.75rem] text-[var(--text-secondary)] rounded-full"
  >
    {children}
  </HoverBorderGradient>
);

const ExperienceSection = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get('/experiences');
        if (data.success) {
          const formattedData = data.data.map(exp => {
            let icon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
            if (exp.type === 'education') {
              icon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
            } else if (exp.type === 'organization') {
              icon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            }

            return {
              title: exp.date_range,
              content: (
                <div className="timeline-card mb-12">
                  <h3>{exp.title}</h3>
                  <div className="timeline-org">
                    {icon}
                    {exp.organization}
                  </div>
                  <p className="timeline-desc">{exp.description}</p>
                  {exp.tags && (
                    <div className="timeline-tags">
                      {exp.tags.split(',').map((tag, i) => (
                        <Pill key={i}>{tag.trim()}</Pill>
                      ))}
                    </div>
                  )}
                </div>
              )
            };
          });
          setExperienceData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch experiences', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <>
      <section className="page-header" id="experience">
        <div className="page-header-inner">
          <h1>Experience</h1>
          <p>A chronological look at my professional growth, academic milestones, and the technical expertise I've built along the way.</p>
        </div>
      </section>

      <section className="timeline-section" style={{ padding: 0 }}>
        {!isLoading && experienceData.length > 0 ? (
          <Timeline data={experienceData} />
        ) : (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {isLoading ? 'Loading timeline...' : 'No experiences found.'}
          </div>
        )}
        
        <div className="closing-cta">
          <h3>Ready to build something great together?</h3>
          <p>Let's talk about how I can contribute to your team.</p>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  );
};

export default ExperienceSection;
