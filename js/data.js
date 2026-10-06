/**
 * ============================================================
 *  EDIT THIS FILE ONLY to change team members, gallery photos,
 *  or the blog post list. The HTML pages, CSS and script.js
 *  don't need to be touched for everyday content updates —
 *  team.html, gallery.html and blog.html all render themselves
 *  from the arrays below, so adding, removing, or reordering
 *  entries can never break the layout.
 *
 *  All image/photo paths below are written root-relative, e.g.
 *  "assets/team/riya.jpg" — NOT "../assets/team/riya.jpg". The
 *  site works out the correct "../" prefix for whichever page
 *  is using them automatically, so always write paths the same
 *  simple way here regardless of which page an image shows up on.
 * ============================================================
 *
 *  TEAM MEMBERS
 *  ------------
 *  photo: leave as null to show an auto-generated initials avatar
 *         (safe placeholder, works fully offline). To use a real
 *         photo: drop a square image into assets/team/ and set
 *         photo to its path, e.g. photo: "assets/team/riya.jpg"
 *
 *  socials: leave any field as "" (empty string) to hide that icon
 *           on the card — no need to delete the line.
 *           email should be a full address, e.g. "riya@ggv.ac.in"
 *           (the page turns it into a mailto: link automatically).
 */

const TEAM_MEMBERS = [
  { id: 1, name: "Shreyansh Jain", position: "Team Lead", photo: "assets/team/shreyansh.jpeg", socials: { linkedin: "https://www.linkedin.com/in/ShreyanshJain/", instagram: "https://www.instagram.com/shreyanshjain_16/", email: "singhaishreyanshjain@gmail.com" } },
  { id: 2, name: "Aryan Kumar Shaw", position: "Co-Lead", photo: "assets/team/aryan.jpeg", socials: { linkedin: "https://www.linkedin.com/in/aryan-shaww", instagram: "https://www.instagram.com/aryan.shaww/", email: "aryanshaw2006@gmail.com" } },
  { id: 3, name: "Shreya pandey", position: "Executive Lead", photo: "assets/team/shreya.jpeg", socials: { linkedin: "https://www.linkedin.com/in/shreya-pandey-805b41306/", instagram: "https://www.instagram.com/shreya.pandey2504/", email: "shreya2310pandey@gmail.com" } },
  { id: 4, name: "Ajay Kumar", position: "Tech Lead", photo: "assets/team/ajay.jpeg", socials: { linkedin: "https://www.linkedin.com/in/ajay-kumar-73b63139b/", instagram: "https://www.instagram.com/imd_ajay/", email: "alt4ajay@gmail.com" } },
  { id: 5, name: "Kritish Roy", position: "Marketing Lead", photo: "assets/team/kritish.jpeg", socials: { linkedin: "", instagram: "", email: "" } },
  { id: 6, name: "Dev Kumar", position: "Social Media & PR Lead", photo: "assets/team/dev.jpeg", socials: { linkedin: "", instagram: "https://www.instagram.com/dev_kumar322/", email: "devkumar1746@gmail.com " } },
  { id: 7, name: "Shivani Kumari", position: "Treasurer", photo: "assets/team/shivani.jpeg", socials: { linkedin: "", instagram: "", email: "" } },
  { id: 8, name: "Priyanshu Singh", position: "Social Media Member", photo: "assets/team/priyanshu.jpeg", socials: { linkedin: "https://www.linkedin.com/in/priyanshu-singh-440a59435/", instagram: "https://www.instagram.com/va_.nshh/", email: "mails.priyanshusingh@gmail.com" } },
  { id: 9, name: "Rama Rauth", position: "Social Media Member", photo: "assets/team/rama.jpeg", socials: { linkedin: "https://www.linkedin.com/in/rama-rauth-158864381/", instagram: "https://www.instagram.com/rama_20._/", email: "ramarauth094@gmail.com" } },
  { id: 10, name: "Sankalp Dubey", position: "Social Media Member", photo: "assets/team/sankalp.jpeg", socials: { linkedin: "", instagram: "", email: "" } },
  { id: 11, name: "Utkarsh Pratap Yadav", position: "Executive Member", photo: "assets/team/utkarsh.jpeg", socials: { linkedin: "", instagram: "", email: "" } },
  { id: 12, name: "Aakash", position: "Executive Member", photo: "assets/team/aakash.jpeg", socials: { linkedin: "https://www.linkedin.com/in/aakash-singh-771672392/", instagram: "https://www.instagram.com/aakash_singh/", email: "aakshsingh138@gmail.com" } },
  { id: 13, name: "Sumit Haldar", position: "Tech Team", photo: "assets/team/sumit.jpeg", socials: { linkedin: "www.linkedin.com/in/sumitaidev/", instagram: "https://www.instagram.com/sumit.ai.tech/", email: "hello@sumitaidev.com" } },
  { id: 14, name: "Rohit Kumar", position: "Marketing Member", photo: "assets/team/rohit.jpeg", socials: { linkedin: "", instagram: "", email: "" } },
  { id: 15, name: "Narayan Das", position: "Campus Ambassador", photo: "assets/team/narayan.jpeg", socials: { linkedin: "https://www.linkedin.com/in/narayan-das-24379a382/", instagram: "https://www.instagram.com/narayan_das/", email: "narayanggv03@gmail.com" } },
];

/**
 *  GALLERY
 *  -------
 *  src: leave as null to show a placeholder tile (offline, no
 *       external image service involved). To use a real photo:
 *       drop it into assets/gallery/ and set src to its path,
 *       e.g. src: "assets/gallery/demo-day.jpg"
 */

const GALLERY_ITEMS = [
  { id: 1, caption: "Team Discussion", src: "assets/gallery/campus-problem-discussion.jpeg" },
  { id: 2, caption: "Member Presentation", src: "assets/gallery/discussing-linkedin.jpeg" },
  { id: 3, caption: "Pitching Event", src: "assets/gallery/idea-pitching.jpeg" },
  { id: 4, caption: "Pitching Event Winners", src: "assets/gallery/idea-pitching-winners.jpeg" },
  { id: 5, caption: "Online Challenge", src: "assets/gallery/online-challenge-winners.jpeg" },
  { id: 6, caption: "Team Meetup", src: "assets/gallery/team.jpeg" },
  { id: 7, caption: "Greeting Panel", src: "assets/gallery/welcoming-judges-1.jpeg" },
  { id: 8, caption: "Greeting Panel", src: "assets/gallery/welcoming-judges-2.jpeg" },
];

/**
 *  BLOG POSTS
 *  ----------
 *  Publishing a new post is two steps:
 *    1. Copy pages/blog/_template.html to pages/blog/your-slug.html
 *       and write the post (see the comments inside that file).
 *    2. Add one entry below. That's it — the excerpt shown on the
 *       blog listing card is generated automatically from the
 *       post's own first paragraph, so you never write it twice.
 *
 *  id:    any unique number.
 *  title: must match the <h1> you wrote in the post file.
 *  date:  "YYYY-MM-DD" — controls sort order (newest first) and
 *         the date shown on the card. Doesn't need to be in order
 *         in this list; the page sorts it for you.
 *  slug:  the post's filename without ".html" — e.g. for
 *         pages/blog/validating-your-idea.html, slug is
 *         "validating-your-idea". Must be exact.
 *  cover: leave as null for a placeholder tile, or set a path like
 *         "assets/blog/my-post-cover.jpg" (drop the image into
 *         assets/blog/ first).
 */

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Highlight Reel vs. The Hustle",
    date: "2026-10-06",
    slug: "the-higligh-reel-vs-the-hustle",
    cover: "assets/blog/the-highlight-reel-vs-the-hustle.png",
  },
  {
    id: 2,
    title: "Inside Our First Ideathon of the Semester",
    date: "2026-09-28",
    slug: "first-ideathon-recap",
    cover: "assets/blog/team.jpeg",
  },
];
