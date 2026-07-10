const db = require('./src/config/db');

async function setup() {
  try {
    console.log('Creating experiences table...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        date_range VARCHAR(255) NOT NULL,
        organization VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(50) DEFAULT 'work',
        tags TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating settings table...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Seeding initial settings data...');
    const initialSettings = [
      { key: 'about_name', value: 'Harry Phalosa' },
      { key: 'about_role', value: 'Fullstack Web Developer' },
      { key: 'about_focus', value: 'React, Node.js, TypeScript' },
      { key: 'about_description', value: 'Informatics Engineering undergraduate at Universitas Brawijaya specializing in Full-Stack Web Development with hands-on experience building scalable web applications. Passionate about backend engineering, software architecture, and modern web technologies.' },
      { key: 'about_cv_url', value: '#' },
      { key: 'about_image_url', value: '' },
      { key: 'contact_email', value: 'harryphalosa@student.ub.ac.id' },
      { key: 'contact_github', value: 'https://github.com/harrymx1' },
      { key: 'contact_linkedin', value: 'https://linkedin.com/in/harryphalosa' }
    ];

    for (const setting of initialSettings) {
      await db.query(
        `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
        [setting.key, setting.value]
      );
    }

    console.log('Seeding initial experiences data...');
    const initialExperiences = [
      {
        title: 'Full-Stack Web Development Trainee',
        date_range: 'Feb 2026 – June 2026',
        organization: 'CODING CAMP 2026 by DBS Foundation (Dicoding)',
        description: 'Completed an intensive full-stack web development program covering React.js, Node.js, RESTful API development, cloud deployment, and software engineering best practices. Collaborated in a cross-functional capstone team to develop CareerPath AI.',
        type: 'education',
        tags: 'React, Node.js, Cloud, REST API',
        order_index: 10
      },
      {
        title: 'Student Village Project Coordinator',
        date_range: 'Jul 2025 – Aug 2025',
        organization: 'MAHASISWA MEMBANGUN DESA (MMD)',
        description: 'Led a multidisciplinary team of 12 students in planning and delivering community development programs for Baturetno Village. Directed the digital transformation initiative by designing and deploying the BUMDes Baturetno Digital POS System.',
        type: 'organization',
        tags: 'Leadership, Full-Stack, PHP, Laravel',
        order_index: 20
      },
      {
        title: 'Event Division Staff',
        date_range: 'Oct 2024 – Apr 2025',
        organization: 'KMK FILKOM UNIVERSITAS BRAWIJAYA',
        description: 'Focused on designing and executing comprehensive run-downs for multiple large-scale events. Coordinated engaging sessions and managed event flow for 100+ attendees.',
        type: 'organization',
        tags: 'Management, Coordination, Logistics',
        order_index: 30
      },
      {
        title: 'Bachelor of Informatics Engineering',
        date_range: 'Aug 2023 – Present',
        organization: 'Brawijaya University',
        description: 'Focusing on software engineering principles, algorithms, and data structures. Maintaining a strong academic record (GPA: 3.73/4.00).',
        type: 'education',
        tags: 'Algorithms, Data Structures, Engineering',
        order_index: 40
      }
    ];

    // Clear existing to avoid duplicates during seeding
    await db.query('DELETE FROM experiences');

    for (const exp of initialExperiences) {
      await db.query(
        `INSERT INTO experiences (title, date_range, organization, description, type, tags, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [exp.title, exp.date_range, exp.organization, exp.description, exp.type, exp.tags, exp.order_index]
      );
    }

    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error setting up DB:', err);
  } finally {
    process.exit(0);
  }
}

setup();
