export interface NewsletterTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
}

export const newsletterTemplates: NewsletterTemplate[] = [
  {
    id: 'weekly-update',
    name: 'Weekly Tech Update',
    subject: 'Weekly Tech Update: {week_number}',
    category: 'Updates',
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .section { margin: 30px 0; padding: 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981; }
            .highlight { background: #ecfdf5; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Weekly Tech Update 🚀</h1>
              <p>Your weekly dose of tech insights</p>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Welcome to this week's tech update! Here's what I've been working on and learning:</p>

              <div class="section">
                <h3>📚 What I'm Learning</h3>
                <p>[Add your learning highlights here]</p>
              </div>

              <div class="section">
                <h3>💻 Project Updates</h3>
                <p>[Share your project progress and updates]</p>
              </div>

              <div class="section">
                <h3>🎯 Tips & Tricks</h3>
                <p>[Include helpful tips or insights]</p>
              </div>

              <div class="highlight">
                <h4>  Featured Content</h4>
                <p>[Highlight something special this week]</p>
              </div>

              <p>Thanks for being part of this journey! What are you working on this week?</p>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="[unsubscribe_link]" style="color: #6b7280;">Unsubscribe</a> |
              <a href="[preferences_link]" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },
  {
    id: 'project-showcase',
    name: 'Project Showcase',
    subject: 'New Project: {project_name}',
    category: 'Projects',
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .project-card { margin: 30px 0; padding: 25px; background: #f9fafb; border-radius: 12px; border: 2px solid #e5e7eb; }
            .tech-stack { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin: 2px; }
            .btn { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Project Launch! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>I'm excited to share a new project I've been working on!</p>

              <div class="project-card">
                <h2 style="margin-top: 0; color: #10b981;">[Project Name]</h2>
                <p style="font-size: 18px; margin: 15px 0;">[Project description - what it does and why it matters]</p>

                <h3>🚀 Key Features</h3>
                <ul>
                  <li>[Feature 1]</li>
                  <li>[Feature 2]</li>
                  <li>[Feature 3]</li>
                </ul>

                <h3>🛠️ Tech Stack</h3>
                <div style="margin: 15px 0;">
                  <span class="tech-stack">React</span>
                  <span class="tech-stack">Next.js</span>
                  <span class="tech-stack">TypeScript</span>
                  <span class="tech-stack">[Add more]</span>
                </div>

                <div style="text-align: center; margin-top: 25px;">
                  <a href="[project_link]" class="btn">View Project</a>
                  <a href="[demo_link]" class="btn" style="background: #0ea5e9;">Live Demo</a>
                </div>
              </div>

              <h3>💡 What I Learned</h3>
              <p>[Share insights, challenges overcome, or lessons learned]</p>

              <p>Would love to hear your thoughts! Have you built something similar?</p>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="[unsubscribe_link]" style="color: #6b7280;">Unsubscribe</a> |
              <a href="[preferences_link]" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },
  {
    id: 'tutorial-announcement',
    name: 'Tutorial Announcement',
    subject: 'New Tutorial: {tutorial_title}',
    category: 'Tutorials',
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .tutorial-card { margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; border-left: 4px solid #0ea5e9; }
            .learning-outcomes { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .btn { display: inline-block; padding: 12px 24px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 5px; }
            .prerequisites { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Tutorial Available! 📚</h1>
              <p>Learn something new today</p>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>I've just published a new tutorial that I think you'll find valuable!</p>

              <div class="tutorial-card">
                <h2 style="margin-top: 0; color: #0ea5e9;">[Tutorial Title]</h2>
                <p style="font-size: 16px; margin: 15px 0; color: #374151;">[Brief description of what readers will learn]</p>

                <div class="prerequisites">
                  <h4>📋 Prerequisites</h4>
                  <ul style="margin: 10px 0;">
                    <li>Basic knowledge of [technology]</li>
                    <li>[Any other requirements]</li>
                  </ul>
                </div>

                <div class="learning-outcomes">
                  <h4>🎯 What You'll Learn</h4>
                  <ul style="margin: 10px 0;">
                    <li>[Learning outcome 1]</li>
                    <li>[Learning outcome 2]</li>
                    <li>[Learning outcome 3]</li>
                  </ul>
                </div>

                <h3>⏱️ Duration: [Estimated time]</h3>
                <h3>🎪 Difficulty: [Beginner/Intermediate/Advanced]</h3>

                <div style="text-align: center; margin-top: 25px;">
                  <a href="[tutorial_link]" class="btn">Start Tutorial</a>
                  <a href="[preview_link]" class="btn" style="background: #10b981;">Preview</a>
                </div>
              </div>

              <h3>💡 Why This Tutorial Matters</h3>
              <p>[Explain the value and real-world applications]</p>

              <p>Ready to level up your skills? Let's dive in!</p>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="[unsubscribe_link]" style="color: #6b7280;">Unsubscribe</a> |
              <a href="[preferences_link]" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },
  {
    id: 'quick-tip',
    name: 'Quick Tip',
    subject: 'Quick Tip: {tip_title}',
    category: 'Tips',
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .tip-card { margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border-left: 4px solid #f59e0b; }
            .code-block { background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 6px; font-family: 'Monaco', 'Menlo', monospace; margin: 15px 0; overflow-x: auto; }
            .btn { display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Quick Tip! 💡</h1>
              <p>Boost your productivity with this simple trick</p>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Here's a quick tip that can save you time and improve your workflow:</p>

              <div class="tip-card">
                <h2 style="margin-top: 0; color: #92400e;">[Tip Title]</h2>
                <p style="font-size: 16px; margin: 15px 0;">[Brief description of the tip]</p>

                <h3>🔧 How to Implement</h3>
                <ol>
                  <li>[Step 1]</li>
                  <li>[Step 2]</li>
                  <li>[Step 3]</li>
                </ol>

                <h3>💻 Code Example</h3>
                <div class="code-block">
                  <pre>[code_example]</pre>
                </div>

                <div style="background: #ecfdf5; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4>✨ Benefits</h4>
                  <ul style="margin: 10px 0;">
                    <li>[Benefit 1]</li>
                    <li>[Benefit 2]</li>
                  </ul>
                </div>
              </div>

              <p>Try implementing this tip in your next project!</p>

              <div style="text-align: center; margin: 25px 0;">
                <a href="[related_content_link]" class="btn">Learn More</a>
              </div>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="[unsubscribe_link]" style="color: #6b7280;">Unsubscribe</a> |
              <a href="[preferences_link]" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },
  {
    id: 'personal-update',
    name: 'Personal Update',
    subject: 'Personal Update: {update_topic}',
    category: 'Personal',
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .personal-card { margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; border-left: 4px solid #8b5cf6; }
            .reflection { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .btn { display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Personal Update 💭</h1>
              <p>Behind the scenes of my developer journey</p>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Thought I'd share a more personal update with you this time.</p>

              <div class="personal-card">
                <h2 style="margin-top: 0; color: #7c3aed;">[Update Topic]</h2>

                <h3>📝 What's New</h3>
                <p>[Share what's happening in your life/career]</p>

                <h3>🎯 Current Focus</h3>
                <p>[What you're working on or thinking about]</p>

                <div class="reflection">
                  <h4>💭 Reflections</h4>
                  <p>[Any insights, lessons learned, or thoughts you want to share]</p>
                </div>

                <h3>🔮 Looking Ahead</h3>
                <p>[What you're excited about for the future]</p>
              </div>

              <p>Thanks for taking the time to read this personal update. Your support means a lot!</p>

              <div style="text-align: center; margin: 25px 0;">
                <a href="[connect_link]" class="btn">Let's Connect</a>
              </div>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="[unsubscribe_link]" style="color: #6b7280;">Unsubscribe</a> |
              <a href="[preferences_link]" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }
];

export const getTemplateById = (id: string): NewsletterTemplate | undefined => {
  return newsletterTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): NewsletterTemplate[] => {
  return newsletterTemplates.filter(template => template.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(newsletterTemplates.map(template => template.category))];
};