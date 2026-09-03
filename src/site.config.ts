/**
 * Single source of truth for anything that appears on every page.
 *
 * This file is the answer to the problem we hit in Figma: the footer
 * change that had to be applied to 42 instances, and the global
 * find-and-replace that broke the navigation twice. Change a nav
 * label or the address here and it changes everywhere, once.
 */

export const org = {
  /** Ordinary prose, per the Voice and Style Guide 5.6 */
  shortName: "Friends of the Latimer House",
  /** Anything legal. Never ", Inc." Never a comma before "at the". */
  legalName:
    "Friends of the Latimer House at the William and Martha Brown Park",
  tagline:
    "The nonprofit that looks after the Latimer House, a 1790's log house in Sumner County, Tennessee.",
  ein: "41-4875485",
  /**
   * NOTE, OPEN ITEM: the donation receipt and the deed give the mailing
   * address of record as 1578 Latimer Lane, Hendersonville TN 37075.
   * The site currently publishes the address the house STANDS at.
   * These are different claims and both may be correct, but this must
   * be settled before launch. See the Launch Plan, Section 7.
   */
  streetAddress: "300 Wolfpack Way",
  addressLocality: "Gallatin",
  addressRegion: "TN",
  postalCode: "37066",
  email: "latimerhouse@protonmail.com",
  founded: "the 1790's",
} as const;

export const site = {
  url: "https://friendsofthelatimerhouse.org",
  title: "Friends of the Latimer House",
  description:
    "A hand hewn log house raised in the 1790's in Sumner County, Tennessee. There is a log house inside that brick house, and we are uncovering it.",
} as const;

/**
 * Primary navigation. Give is deliberately NOT in this list: it is the
 * persistent button in the header, which is why the Give page shows no
 * active nav item. See the Copy Deck, Section 1.5.
 */
export const nav = [
  { label: "The Story", href: "/the-story/" },
  { label: "The Restoration", href: "/the-restoration/" },
  { label: "Visit", href: "/visit/" },
  { label: "Get Involved", href: "/get-involved/" },
  { label: "News", href: "/news/" },
  { label: "About", href: "/about/" },
] as const;

/** Mobile tab bar, four slots. */
export const tabBar = [
  { label: "Home", href: "/" },
  { label: "The Story", href: "/the-story/" },
  { label: "Restoration", href: "/the-restoration/" },
  { label: "Give", href: "/give/" },
] as const;

export const give = {
  href: "/give/",
  label: "Give",
  /**
   * PayPal hosted button. Created at paypal.com/donate/buttons under the
   * ORGANISATION's PayPal account. Plain link, no JavaScript, cannot break.
   * Fill in once the button exists; the confirmed-charity rate applies
   * automatically on approval with no change here.
   */
  paypalHostedButtonId: "",
  get paypalUrl() {
    return this.paypalHostedButtonId
      ? `https://www.paypal.com/donate/?hosted_button_id=${this.paypalHostedButtonId}`
      : "/give/";
  },
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
] as const;

/** Footer columns. Copy Deck, Section 1.4. */
export const footerColumns = [
  {
    heading: "Find Us",
    body: `${org.streetAddress}, ${org.addressLocality} ${org.addressRegion}, ${org.postalCode}`,
  },
  {
    heading: "Volunteer",
    body: "Workdays, tours and community events",
  },
  {
    heading: "Give",
    body: "Every gift goes into the house and the ground around it",
  },
  {
    heading: "Follow Us",
    body: "Follow the work as it happens",
    socials: true,
  },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Site Credits", href: "/site-credits/" },
] as const;

/**
 * "All rights reserved" is deliberately absent: vestigial in the US since
 * the Berne Convention took effect in 1989. The EIN is deliberately absent
 * too, and lives on the Give page where a donor needs it.
 */
export const copyrightLine = `© ${new Date().getFullYear()} ${org.legalName}  ·  A 501(c)(3) nonprofit organization`;
