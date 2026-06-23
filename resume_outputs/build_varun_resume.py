from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer


OUT_DIR = Path(__file__).resolve().parent
DOCX_PATH = OUT_DIR / "Varun_Patel_Software_Resume_2026-06-23.docx"
PDF_PATH = OUT_DIR / "Varun_Patel_Software_Resume_2026-06-23.pdf"


resume = {
    "name": "Varun Manojkumar Patel",
    "contact": "Vaughan, ON | (647) 706-4399 | varun05@my.yorku.ca | github.com/zeudriven | linkedin.com/in/student-cc-yorku-varun-patel",
    "sections": [
        (
            "Education",
            [
                ("Bachelor of Science (Honours) in Computer Science | York University, Toronto, ON | Present", "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems")
            ],
        ),
        (
            "Technical Skills",
            [
                "Programming Languages: Java, Python, JavaScript, TypeScript, SQL, C#, HTML5, CSS3",
                "Web Technologies: React.js, Next.js, FastAPI, HTML5, CSS3, Tailwind CSS, Phaser 3",
                "Databases: MySQL, SQLite, Database Design, Data Modeling, Relational Databases, Database Normalization (3NF)",
                "Software Development: RESTful APIs, CRUD Operations, API Integration, SQLAlchemy, MVC Architecture, Object-Oriented Programming (OOP), Data Structures & Algorithms, Responsive Web Design",
                "Tools & Platforms: Git, GitHub, Node.js, npm, Visual Studio, Agile/Scrum",
            ],
        ),
        (
            "Projects",
            [
                (
                    "Interactive Developer Portfolio | Next.js, React, TypeScript, Tailwind CSS, Phaser 3, Node.js/npm",
                    [
                        "Built a game-inspired developer portfolio with Next.js App Router, React components, TypeScript typing, and reusable pixel-art UI elements across 5 production-style routes.",
                        "Implemented keyboard-driven navigation with React state/effects and a client-rendered Phaser scene, creating an interactive portfolio experience for project discovery and resume access.",
                        "Organized reusable UI components, profile data, asset slots, and route-level pages to make future project updates and portfolio deployment straightforward.",
                    ],
                ),
                (
                    "Scotia FutureFlex: Micro-Investment & Trading Engagement Platform | Python, FastAPI, SQLAlchemy, SQLite, HTML, CSS, JavaScript",
                    [
                        "Won Best UI/UX Design at a Scotiabank hackathon by engineering a deployed mobile-first investment app with QR code access, real-time portfolio flows, and 50+ demo users.",
                        "Developed 12+ REST API endpoints using FastAPI and SQLAlchemy, enabling real-time portfolio tracking, transaction management, and financial data retrieval.",
                        "Designed and implemented a mobile-first JavaScript frontend serving 50+ users during live product demonstrations, improving usability and navigation efficiency.",
                    ],
                ),
                (
                    "FoodLoop: AI Logistics & Food Resource Optimization Platform | Java, Python, MySQL",
                    [
                        "Won 3rd place among 100+ participants by building a platform for surplus food routing, inventory visibility, dynamic pricing, and resource allocation.",
                        "Architected a 3NF MySQL database for real-time inventory tracking, multi-zone delivery workflows, and scalable supply-chain data relationships.",
                        "Built a RESTful Java service layer exposing logistics APIs for integration across inventory, pricing, and delivery stakeholders.",
                    ],
                ),
                (
                    "AI Workflow Automation Assistant | Python, FastAPI, SQLAlchemy, SQLite, HTML, CSS, JavaScript",
                    [
                        "Developed a full-stack AI assistant that converts unstructured user requests into organized task plans, summaries, and reusable automation workflows.",
                        "Engineered CRUD REST endpoints and SQLAlchemy data models for workflow records, categories, and request history, supporting persistent workflow retrieval and updates.",
                        "Shipped a responsive web frontend for prompt submission, live AI output review, and structured export in a single sprint.",
                    ],
                ),
            ],
        ),
        (
            "Leadership Experience",
            [
                (
                    "Director of Student Life | Enactus York | September 2025 - Present",
                    [
                        "Led 8+ members to Enactus Canada Regionals and won 3/3 challenge categories, earning approximately $2,500 in prizes from TD Bank, Enactus, and Canadian Tire.",
                        "Managed competition pipeline from pitch development through execution, coordinating logistics, resource planning, and cross-team delivery.",
                    ],
                ),
                (
                    "VP Officer, Community | Lassonde Student Council | January 2025 - Present",
                    [
                        "Coordinated planning, outreach, and execution for student initiatives with council members across Lassonde.",
                        "Represented student interests through engagement initiatives and cross-campus collaboration.",
                    ],
                ),
            ],
        ),
        (
            "Extracurriculars & Achievements",
            [
                "Team Lead, COIE Climathon: Led a multidisciplinary team to design an IoT-based management system and placed 3rd among 100+ participants by delivering a high-impact prototype and pitch under strict deadlines."
            ],
        ),
    ],
}


def add_docx_paragraph(doc, text="", style=None, bold_prefix=None):
    p = doc.add_paragraph(style=style)
    if bold_prefix and text.startswith(bold_prefix):
        run = p.add_run(bold_prefix)
        run.bold = True
        p.add_run(text[len(bold_prefix) :])
    else:
        p.add_run(text)
    return p


def build_docx():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.45)
    section.bottom_margin = Inches(0.45)
    section.left_margin = Inches(0.5)
    section.right_margin = Inches(0.5)

    styles = doc.styles
    styles["Normal"].font.name = "Calibri"
    styles["Normal"].font.size = Pt(9)
    styles["Heading 1"].font.name = "Calibri"
    styles["Heading 1"].font.size = Pt(10)
    styles["Heading 1"].font.bold = True

    name = doc.add_paragraph()
    name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    name_run = name.add_run(resume["name"])
    name_run.bold = True
    name_run.font.size = Pt(15)

    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact_run = contact.add_run(resume["contact"])
    contact_run.font.size = Pt(8.5)

    for title, items in resume["sections"]:
        heading = doc.add_paragraph()
        heading.paragraph_format.space_before = Pt(4)
        heading.paragraph_format.space_after = Pt(1)
        run = heading.add_run(title.upper())
        run.bold = True
        run.font.size = Pt(10)

        if title in {"Summary", "Technical Skills", "Extracurriculars & Achievements"}:
            for item in items:
                p = doc.add_paragraph(str(item))
                p.paragraph_format.space_after = Pt(1)
                p.paragraph_format.line_spacing = 1.0
        elif title == "Education":
            for degree, course in items:
                p = add_docx_paragraph(doc, degree)
                p.runs[0].bold = True
                p.paragraph_format.space_after = Pt(0)
                c = doc.add_paragraph(course)
                c.paragraph_format.space_after = Pt(1)
        else:
            for header, bullets in items:
                h = doc.add_paragraph()
                h.paragraph_format.space_before = Pt(2)
                h.paragraph_format.space_after = Pt(0)
                h_run = h.add_run(header)
                h_run.bold = True
                for bullet in bullets:
                    p = doc.add_paragraph(style="List Bullet")
                    p.paragraph_format.left_indent = Inches(0.18)
                    p.paragraph_format.first_line_indent = Inches(-0.18)
                    p.paragraph_format.space_after = Pt(0)
                    p.paragraph_format.line_spacing = 1.0
                    p.add_run(bullet)

    doc.save(DOCX_PATH)


def esc(text):
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def build_pdf():
    styles = getSampleStyleSheet()
    normal = ParagraphStyle("ResumeNormal", parent=styles["Normal"], fontName="Helvetica", fontSize=8.2, leading=9.4, spaceAfter=2)
    bullet = ParagraphStyle("ResumeBullet", parent=normal, leftIndent=12, firstLineIndent=-7, bulletIndent=0)
    section = ParagraphStyle("ResumeSection", parent=normal, fontName="Helvetica-Bold", fontSize=9.2, leading=10, spaceBefore=4, spaceAfter=1, textColor=colors.black)
    title = ParagraphStyle("ResumeTitle", parent=normal, fontName="Helvetica-Bold", fontSize=15, leading=17, alignment=1, spaceAfter=1)
    contact = ParagraphStyle("ResumeContact", parent=normal, fontSize=7.8, leading=9, alignment=1, spaceAfter=4)
    boldline = ParagraphStyle("ResumeBoldLine", parent=normal, fontName="Helvetica-Bold", spaceAfter=0)

    story = [Paragraph(esc(resume["name"]), title), Paragraph(esc(resume["contact"]), contact)]
    for heading, items in resume["sections"]:
        story.append(Paragraph(heading.upper(), section))
        if heading in {"Summary", "Technical Skills", "Extracurriculars & Achievements"}:
            for item in items:
                story.append(Paragraph(esc(item), normal))
        elif heading == "Education":
            for degree, course in items:
                story.append(Paragraph(esc(degree), boldline))
                story.append(Paragraph(esc(course), normal))
        else:
            for header, bullets in items:
                story.append(Paragraph(esc(header), boldline))
                for item in bullets:
                    story.append(Paragraph(esc(item), bullet, bulletText="-"))
        story.append(Spacer(1, 1))

    pdf = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=letter,
        rightMargin=0.45 * inch,
        leftMargin=0.45 * inch,
        topMargin=0.35 * inch,
        bottomMargin=0.35 * inch,
    )
    pdf.build(story)


if __name__ == "__main__":
    build_docx()
    build_pdf()
    print(DOCX_PATH)
    print(PDF_PATH)
