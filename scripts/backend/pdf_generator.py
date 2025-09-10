from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from io import BytesIO
import json
from datetime import datetime

class ResumeGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        # Custom styles for resume
        self.styles.add(ParagraphStyle(
            name='ResumeTitle',
            parent=self.styles['Title'],
            fontSize=24,
            spaceAfter=12,
            textColor=colors.HexColor('#15803d'),
            alignment=TA_CENTER
        ))
        
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=14,
            spaceAfter=6,
            spaceBefore=12,
            textColor=colors.HexColor('#15803d'),
            borderWidth=1,
            borderColor=colors.HexColor('#15803d'),
            borderPadding=3
        ))
        
        self.styles.add(ParagraphStyle(
            name='ContactInfo',
            parent=self.styles['Normal'],
            fontSize=10,
            alignment=TA_CENTER,
            spaceAfter=12
        ))
        
        self.styles.add(ParagraphStyle(
            name='JobTitle',
            parent=self.styles['Normal'],
            fontSize=12,
            textColor=colors.HexColor('#374151'),
            spaceBefore=6,
            leftIndent=20
        ))
        
        self.styles.add(ParagraphStyle(
            name='JobDetails',
            parent=self.styles['Normal'],
            fontSize=10,
            textColor=colors.HexColor('#6b7280'),
            leftIndent=20
        ))
    
    def generate_pdf(self, resume_data: dict) -> BytesIO:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=0.5*inch)
        story = []
        
        # Personal Details Section
        personal = resume_data['data']['personalDetails']
        
        # Name (Title)
        story.append(Paragraph(personal['fullName'], self.styles['ResumeTitle']))
        
        # Contact Information
        contact_info = []
        if personal.get('email'):
            contact_info.append(personal['email'])
        if personal.get('phone'):
            contact_info.append(personal['phone'])
        if personal.get('location'):
            contact_info.append(personal['location'])
        
        contact_line = " | ".join(contact_info)
        story.append(Paragraph(contact_line, self.styles['ContactInfo']))
        
        # Links
        links = []
        if personal.get('website'):
            links.append(f"Website: {personal['website']}")
        if personal.get('linkedin'):
            links.append(f"LinkedIn: {personal['linkedin']}")
        if personal.get('github'):
            links.append(f"GitHub: {personal['github']}")
        
        if links:
            links_line = " | ".join(links)
            story.append(Paragraph(links_line, self.styles['ContactInfo']))
        
        story.append(Spacer(1, 12))
        
        # Experience Section
        if resume_data['data'].get('experience'):
            story.append(Paragraph("PROFESSIONAL EXPERIENCE", self.styles['SectionHeader']))
            
            for exp in resume_data['data']['experience']:
                # Job title and company
                job_header = f"<b>{exp['position']}</b> - {exp['company']}"
                story.append(Paragraph(job_header, self.styles['JobTitle']))
                
                # Dates
                end_date = "Present" if exp.get('current') else exp['endDate']
                date_range = f"{exp['startDate']} - {end_date}"
                story.append(Paragraph(date_range, self.styles['JobDetails']))
                
                # Description
                if exp.get('description'):
                    story.append(Paragraph(exp['description'], self.styles['Normal']))
                
                story.append(Spacer(1, 6))
        
        # Education Section
        if resume_data['data'].get('education'):
            story.append(Paragraph("EDUCATION", self.styles['SectionHeader']))
            
            for edu in resume_data['data']['education']:
                # Degree and school
                edu_header = f"<b>{edu['degree']} in {edu['field']}</b> - {edu['school']}"
                story.append(Paragraph(edu_header, self.styles['JobTitle']))
                
                # Dates
                date_range = f"{edu['startDate']} - {edu['endDate']}"
                story.append(Paragraph(date_range, self.styles['JobDetails']))
                
                # GPA if provided
                if edu.get('gpa'):
                    story.append(Paragraph(f"GPA: {edu['gpa']}", self.styles['JobDetails']))
                
                # Description
                if edu.get('description'):
                    story.append(Paragraph(edu['description'], self.styles['Normal']))
                
                story.append(Spacer(1, 6))
        
        # Skills Section
        if resume_data['data'].get('skills'):
            story.append(Paragraph("SKILLS", self.styles['SectionHeader']))
            skills_text = " • ".join(resume_data['data']['skills'])
            story.append(Paragraph(skills_text, self.styles['Normal']))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer

def generate_resume_pdf(resume_data: dict) -> BytesIO:
    generator = ResumeGenerator()
    return generator.generate_pdf(resume_data)
