const db = require('./config/database');
const { hashPassword } = require('./utils/password.util');

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Sync database (creates tables if they don't exist)
    await db.sequelize.sync({ force: true }); // WARNING: This will drop all tables
    console.log('Database synced');

    // Create users
    console.log('Creating users...');
    const adminPassword = await hashPassword('admin123');
    const managerPassword = await hashPassword('manager123');
    const userPassword = await hashPassword('user123');

    const admin = await db.User.create({
      username: 'admin',
      email: 'admin@apqp.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });

    const manager = await db.User.create({
      username: 'manager',
      email: 'manager@apqp.com',
      password: managerPassword,
      firstName: 'Project',
      lastName: 'Manager',
      role: 'project_manager'
    });

    const user = await db.User.create({
      username: 'user',
      email: 'user@apqp.com',
      password: userPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: 'user'
    });

    console.log('✓ Users created');

    // Create clients
    console.log('Creating clients...');
    const client1 = await db.Client.create({
      name: 'Automotive OEM Inc.',
      email: 'contact@oem.com',
      ppapLevel: 3,
      contactPerson: 'John Smith',
      phone: '+1-555-0100',
      address: '123 Auto Drive, Detroit, MI 48201'
    });

    const client2 = await db.Client.create({
      name: 'Global Motors Ltd.',
      email: 'info@globalmotors.com',
      ppapLevel: 4,
      contactPerson: 'Jane Doe',
      phone: '+1-555-0200',
      address: '456 Engine Street, Detroit, MI 48202'
    });

    console.log('✓ Clients created');

    // Create projects
    console.log('Creating projects...');
    const project1 = await db.Project.create({
      name: 'Engine Component A Development',
      description: 'Development of new engine component with improved efficiency',
      status: 'in_progress',
      clientId: client1.id,
      startDate: new Date('2024-01-15'),
      targetDate: new Date('2024-12-31')
    });

    const project2 = await db.Project.create({
      name: 'Transmission System Upgrade',
      description: 'Upgrading transmission system for better performance',
      status: 'planning',
      clientId: client2.id,
      startDate: new Date('2024-03-01'),
      targetDate: new Date('2025-03-01')
    });

    const project3 = await db.Project.create({
      name: 'Brake System Innovation',
      description: 'Next-generation brake system development',
      status: 'in_progress',
      clientId: client1.id,
      startDate: new Date('2024-02-01'),
      targetDate: new Date('2024-11-30')
    });

    console.log('✓ Projects created');

    // Create parts
    console.log('Creating parts...');
    const part1 = await db.Part.create({
      projectId: project1.id,
      name: 'Engine Block',
      partNumber: 'ENG-BLK-001',
      description: 'Main engine block component',
      revision: 'Rev A',
      status: 'active'
    });

    const part2 = await db.Part.create({
      projectId: project1.id,
      name: 'Cylinder Head',
      partNumber: 'CYL-HD-001',
      description: 'Cylinder head assembly',
      revision: 'Rev B',
      status: 'under_review'
    });

    const part3 = await db.Part.create({
      projectId: project2.id,
      name: 'Gear Assembly',
      partNumber: 'GR-ASSY-001',
      description: 'Transmission gear assembly',
      revision: 'Rev A',
      status: 'draft'
    });

    console.log('✓ Parts created');

    // Create epics (APQP phases)
    console.log('Creating APQP phases (epics)...');
    const epic1 = await db.Epic.create({
      projectId: project1.id,
      partId: part1.id,
      name: 'Plan and Define Program',
      description: 'Initial planning and program definition phase',
      phase: 'plan',
      status: 'completed',
      startDate: new Date('2024-01-15'),
      dueDate: new Date('2024-03-15')
    });

    const epic2 = await db.Epic.create({
      projectId: project1.id,
      partId: part1.id,
      name: 'Product Design and Development',
      description: 'Design and development of product',
      phase: 'design',
      status: 'in_progress',
      startDate: new Date('2024-03-16'),
      dueDate: new Date('2024-06-30')
    });

    const epic3 = await db.Epic.create({
      projectId: project1.id,
      partId: part1.id,
      name: 'Process Design and Development',
      description: 'Process planning and development',
      phase: 'develop',
      status: 'not_started',
      startDate: new Date('2024-07-01'),
      dueDate: new Date('2024-09-30')
    });

    const epic4 = await db.Epic.create({
      projectId: project2.id,
      partId: part3.id,
      name: 'Plan and Define Program',
      description: 'Planning phase for transmission project',
      phase: 'plan',
      status: 'in_progress',
      startDate: new Date('2024-03-01'),
      dueDate: new Date('2024-05-01')
    });

    console.log('✓ APQP phases created');

    // Create items (deliverables)
    console.log('Creating deliverable items...');
    await db.Item.create({
      epicId: epic1.id,
      name: 'Design Goals and Objectives',
      description: 'Define design goals and objectives document',
      status: 'completed',
      priority: 'high',
      assignedTo: manager.id,
      dueDate: new Date('2024-02-01'),
      completedDate: new Date('2024-01-28')
    });

    await db.Item.create({
      epicId: epic1.id,
      name: 'Reliability and Quality Goals',
      description: 'Establish reliability and quality targets',
      status: 'completed',
      priority: 'high',
      assignedTo: manager.id,
      dueDate: new Date('2024-02-15'),
      completedDate: new Date('2024-02-12')
    });

    await db.Item.create({
      epicId: epic2.id,
      name: 'Design FMEA',
      description: 'Complete Design Failure Mode and Effects Analysis',
      status: 'in_progress',
      priority: 'critical',
      assignedTo: user.id,
      dueDate: new Date('2024-05-15')
    });

    await db.Item.create({
      epicId: epic2.id,
      name: 'Design Verification Plan',
      description: 'Create and execute design verification plan',
      status: 'in_progress',
      priority: 'high',
      assignedTo: user.id,
      dueDate: new Date('2024-06-01')
    });

    await db.Item.create({
      epicId: epic2.id,
      name: 'Engineering Drawings',
      description: 'Complete engineering drawings and specifications',
      status: 'pending',
      priority: 'medium',
      assignedTo: user.id,
      dueDate: new Date('2024-06-15')
    });

    await db.Item.create({
      epicId: epic3.id,
      name: 'Process Flow Diagram',
      description: 'Create process flow diagram',
      status: 'pending',
      priority: 'high',
      assignedTo: manager.id,
      dueDate: new Date('2024-07-15')
    });

    await db.Item.create({
      epicId: epic4.id,
      name: 'Customer Requirements',
      description: 'Document customer requirements and expectations',
      status: 'in_progress',
      priority: 'critical',
      assignedTo: manager.id,
      dueDate: new Date('2024-04-01')
    });

    console.log('✓ Deliverable items created');

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================\n');
    console.log('Test User Accounts:');
    console.log('-------------------');
    console.log('Admin:    admin@apqp.com      / admin123');
    console.log('Manager:  manager@apqp.com    / manager123');
    console.log('User:     user@apqp.com       / user123');
    console.log('\n========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
