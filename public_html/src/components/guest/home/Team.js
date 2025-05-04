import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah John',
      designation: 'Neurology',
      image: 'img/team/team-001.webp',
    },
    {
      name: 'Dr. Emily Davis',
      designation: 'Fellow',
      image: 'img/team/team-002.webp',
    },
    {
      name: 'Dr. Jessi Taylor',
      designation: 'Psychiatrist',
      image: 'img/team/team-003.webp',
    },
    {
      name: 'Dr. Steve Clark',
      designation: 'Physician',
      image: 'img/team/team-004.webp',
    },
    {
      name: 'Dr. Nancy Lewis',
      designation: 'Orthopaedics',
      image: 'img/team/team-005.webp',
    },
    {
      name: 'Dr. Linda Walkr',
      designation: 'Pathologist',
      image: 'img/team/team-006.webp',
    },
  ];

  return (
    <section className="Team">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pq-section-title">
              <span className="pq-sub-title">TEAM MEMBERS</span>
              <h2 data-splitting className="pq-main-title">
                Our Expert Doctors
              </h2>
            </div>
            <div className="pq-btn-container pq-section-btn">
              <a href="our-team-2.html" className="pq-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">view More</span>
                  <span className="pq-button-text">view More</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pq-team-1-list pq-hover-active">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ name, designation, image }) => (
  <div className="pq-team pq-style-1 pq-hover-item">
    <div className="pq-team-member-img">
      <img className="pq-img" src={image} alt="team img" />
    </div>
    <div className="pq-member-info">
      <h2 className="pq-member-name">{name}</h2>
      <span className="pq-member-designation">{designation}</span>
      <div className="pq-team-member-social-icon">
        <ul className="pq-social-list">
          <li>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Team;