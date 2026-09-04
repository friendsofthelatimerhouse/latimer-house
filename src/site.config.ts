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
   * SETTLED. The physical location of the house, and the address this
   * site publishes. Does not get relitigated.
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
  { label: "The Story", href: "/the-story/", icon: "story" },
  { label: "The Restoration", href: "/the-restoration/", icon: "restoration" },
  { label: "Visit", href: "/visit/", icon: "visit" },
  { label: "Get Involved", href: "/get-involved/", icon: "get-involved" },
  { label: "News", href: "/news/", icon: "news" },
  { label: "About", href: "/about/", icon: "about" },
] as const;

/**
 * The Story's four sub pages. The off canvas rail lists them as a group,
 * because on a phone the only way to reach them otherwise is to land on
 * The Story first and pick a door.
 */
export const storyChildren = [
  { label: "The Log House", href: "/the-story/the-log-house/", icon: "log-house" },
  { label: "The Latimers", href: "/the-story/the-latimers/", icon: "latimers" },
  { label: "The Browns", href: "/the-story/the-browns/", icon: "browns" },
  { label: "The Park", href: "/the-story/the-park/", icon: "park" },
] as const;

/**
 * Getting in touch is not a page. It is section FOUR of About, which is
 * why this is an anchor rather than a route of its own.
 */
export const contact = {
  label: "Get in Touch",
  href: "/about/#get-in-touch",
  icon: "contact",
} as const;

/**
 * Mobile tab bar, four slots. Phones only; the canvas places it on the
 * Mobile frames and on none of the Tablet ones.
 *
 * The icons are the ones the Tab Bar component uses, which are not the
 * same marks the rail gives these destinations. See the note in
 * TabBar.astro.
 */
export const tabBar = [
  { label: "Home", href: "/", icon: "story" },
  { label: "The Story", href: "/the-story/", icon: "latimers" },
  { label: "Restoration", href: "/the-restoration/", icon: "restoration" },
  { label: "Give", href: "/give/", icon: "give" },
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

/**
 * Kit, formerly ConvertKit. Free to 10,000 subscribers with unlimited
 * sends, which this organization will not approach for years.
 *
 * `action` is the form POST endpoint Kit gives you when the form is
 * created under the ORGANISATION's Kit account. Until it is filled in the
 * signup band renders disabled rather than posting into a void.
 */
export const newsletter = {
  /**
   * Kit form 9881603, "Website Signup", created under the organisation's Kit
   * account. This is the HTML embed endpoint, not the JavaScript one: the
   * forms post straight to it with no script, so they cannot break if Kit's
   * CDN is slow or blocked.
   *
   * Double opt-in is on at Kit's end, so a submission here sends a
   * confirmation email and the person is not a subscriber until they click it.
   *
   * Because there is no JavaScript, the browser follows Kit's response after
   * posting. Today that is Kit's own hosted success page. Once the site is
   * published, set "After confirming redirect to" in the Kit form settings to
   * https://friendsofthelatimerhouse.org/thank-you/ and the reader lands back
   * on our own page instead.
   */
  action: "https://app.kit.com/forms/9881603/subscriptions",
  formId: "9881603",
  emailField: "email_address",
} as const;

/**
 * Only accounts that actually exist. A row of five icons where three lead
 * nowhere reads as an organization pretending to be bigger than it is.
 * YouTube and LinkedIn marks are still in SocialIcon, ready when there is
 * something at the other end of them.
 */
export const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/friendsofthelatimerhouse/",
    icon: "facebook",
  },
] as const;

/**
 * Google's documented Maps URL scheme, which resolves the address on any
 * device rather than pinning a coordinate that could drift.
 */
export const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    `${org.streetAddress}, ${org.addressLocality}, ${org.addressRegion} ${org.postalCode}`,
  );

/**
 * Footer columns. Copy Deck, Section 1.4.
 *
 * Every heading is a link. An href starting with http is treated as
 * external by SiteFooter and opens in a new tab.
 */
export const footerColumns = [
  {
    heading: "Find Us",
    href: mapUrl,
    body: `${org.streetAddress}, ${org.addressLocality} ${org.addressRegion}, ${org.postalCode}`,
  },
  {
    heading: "Volunteer",
    href: "/get-involved/",
    body: "Workdays, tours and community events",
  },
  {
    heading: "Give",
    href: give.href,
    body: "Every gift goes into the house and the ground around it",
  },
  {
    heading: "Follow Us",
    href: socials[0].href,
    body: "Follow the work as it happens",
    socials: true,
  },
] as const;

/**
 * An href starting with http is treated as external by SiteFooter and
 * opens in a new tab.
 */
export const legalLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Site Credits", href: "https://www.brandaiddesignco.com" },
] as const;

/**
 * "All rights reserved" is deliberately absent: vestigial in the US since
 * the Berne Convention took effect in 1989. The EIN is deliberately absent
 * too, and lives on the Give page where a donor needs it.
 */
export const copyrightLine = `© ${new Date().getFullYear()} ${org.legalName}  ·  A 501(c)(3) nonprofit organization`;
