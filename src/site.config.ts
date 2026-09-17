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
   * SETTLED. The physical location of the HOUSE AND PARK, and nothing else.
   *
   * This address is for in person visits only. It is not the charter
   * address, not the board's address, not the mailing address, and nothing
   * should ever be sent or delivered here. Anything in an envelope goes to
   * `mailing` below, which is the address on the charter.
   *
   * Use this one for Find Us, the map link, the Visit page, and the Place
   * in the structured data. Nowhere else.
   */
  streetAddress: "300 Wolfpack Way",
  addressLocality: "Gallatin",
  addressRegion: "TN",
  postalCode: "37066",
  /**
   * The public address, on our own domain. It reaches the same Proton inbox
   * the old latimerhouse@protonmail.com one did, through the ImprovMX
   * catch-all, so nothing about where the mail lands has changed. What
   * changed is what a reader sees: an organization that owns a domain and
   * asks people to write to a free webmail account looks like an
   * organization that does not quite exist yet.
   *
   * Tested by sending to it and watching it arrive, on 17 September 2026,
   * rather than by reading the catch-all row in the ImprovMX dashboard.
   *
   * This is the address on eight pages including Privacy and both gift
   * pages, so it is a load bearing string. If receiving ever moves to
   * Google Workspace, create info@ there as a real mailbox before the MX
   * records change, not after.
   */
  email: "info@friendsofthelatimerhouse.org",
  founded: "the 1790's",
} as const;

/**
 * THE ORGANIZATION'S ADDRESS. This is the one on the charter, and it is the
 * board's address, the nonprofit's address of record and the mailing
 * address. Checks, correspondence, deliveries and anything legal go here.
 *
 * The org block above is the HOUSE, and it is a visiting address only.
 *
 * Keep the two apart. Collapsing them loses somebody's donation.
 */
export const mailing = {
  streetAddress: "1578 Latimer Lane",
  addressLocality: "Hendersonville",
  addressRegion: "TN",
  postalCode: "37075",
} as const;

/** One line, for prose. */
export const mailingLine =
  `${mailing.streetAddress}, ${mailing.addressLocality} ${mailing.addressRegion} ${mailing.postalCode}`;

/**
 * THE PRE LAUNCH SWITCH. One line, and it is the only line to change on
 * launch day.
 *
 * While this is true, every page on the site carries a noindex tag, so the
 * site can be live at its real address, handed to the board, and opened on a
 * phone, without turning up in anybody's search results.
 *
 * Set it to false when the board has signed off and the organization is ready
 * to be found. Nothing else needs touching: robots.txt and the sitemap both
 * read this.
 *
 * A note on why robots.txt does NOT block crawlers while this is true, which
 * looks wrong and is not. A crawler that is refused the page never reads the
 * noindex tag inside it, and a bare URL somebody links to can still end up
 * listed. Letting crawlers in so they can be told "do not index" is what
 * actually keeps the site out of the index.
 */
export const prelaunch = false;

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

/**
 * Membership. A different thing from a gift and a different PayPal object,
 * so it gets its own destination rather than sharing the Give page's.
 *
 * `href` is where somebody arrives to read what membership is: the tiers
 * and the calendar year live on Get Involved, and nobody should be asked
 * to pay before seeing them. The Give page's membership button points
 * here, not at PayPal, on purpose.
 *
 * `paypalUrl` is where the button in THAT section goes once the tiered
 * button exists. It falls back to an empty string rather than to the Give
 * page. Falling back to Give is what produced the loop this replaced:
 * Give sent you to Get Involved, and Get Involved sent you back to Give,
 * so the one thing a reader wanted to do was the one thing they could not.
 * A fallback that quietly points somewhere plausible is worse than no
 * fallback, because it looks like it works.
 */
export const membership = {
  href: "/get-involved/#membership",
  label: "Join the Friends",
  /**
   * PayPal hosted button with the four tiers, yearly. Not yet made. The
   * amounts have to match the ones published on Get Involved exactly:
   * $25 Family, $100 Sponsor, $250 Patron, $500 Benefactor.
   */
  paypalHostedButtonId: "",
  get paypalUrl() {
    return this.paypalHostedButtonId
      ? `https://www.paypal.com/donate/?hosted_button_id=${this.paypalHostedButtonId}`
      : "";
  },
} as const;

export const give = {
  href: "/give/",
  label: "Give",
  /**
   * PayPal hosted button, created 17 September 2026 under the
   * ORGANIZATION's PayPal account and named there "Website · General gift".
   * A plain link, no JavaScript, so it cannot break if PayPal's script is
   * slow or blocked. Filling this in is what takes the buttons on /give/
   * out of their disabled state; nothing else on that page changes.
   *
   * How it is configured at PayPal's end, recorded here because none of it
   * is visible from the code:
   *
   *   Amounts        $50 / $250 / $1,000, plus any amount
   *   Recurring      Monthly only. NOT yearly, on purpose: membership is
   *                  the annual product, $25 on the calendar year, and two
   *                  annual commitments under different names would be one
   *                  decision wearing two hats
   *   Fee offset     Offered, unchecked by default
   *   Addresses      Collected, because /give/ promises written
   *                  acknowledgment and the IRS letter above $250
   *   Complete URL   /thank-you/gift/
   *   Cancel URL     /give/cancelled/
   *
   * The confirmed charity rate of 1.99% + $0.49 on domestic transactions
   * applies automatically and needs nothing here.
   */
  paypalHostedButtonId: "8E9UMX6TXW7A4",
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
 * created under the ORGANIZATION's Kit account. Until it is filled in the
 * signup band renders disabled rather than posting into a void.
 */
export const newsletter = {
  /**
   * Kit form 9881603, "Website Signup", created under the organization's Kit
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
  /**
   * Kit's built in first name field. Raw posts address custom and built in
   * fields as fields[name], which is why this is not a bare "first_name".
   *
   * Deliberately NOT required on the forms. Somebody who wants the news and
   * does not want to give a name should still get in; a required field here
   * buys a greeting at the cost of subscribers. Emails handle the gap with
   * Kit's fallback: {{ subscriber.first_name | default: "friend" }}.
   */
  firstNameField: "fields[first_name]",
} as const;

/**
 * Kit form 9918609, "Supporter Details". The block at the foot of the thank
 * you page, where somebody who has just confirmed can leave a phone number
 * and a mailing address.
 *
 * It has to be a separate form. The redirect after submitting is a per form
 * setting in Kit, so posting this to the signup form above would send the
 * person to /check-your-inbox/ and tell somebody who confirmed a minute
 * earlier to go and check their inbox again.
 *
 * Kit matches a submission to an existing subscriber by email address,
 * which is the only reason this block asks for an address it already has.
 * A typo does not fail loudly: it creates a second, unconfirmed subscriber
 * carrying a phone number and no history. The field says so on the page.
 *
 * The confirmation email is left ON at Kit's end and cannot reach the
 * people this block is for, because Kit sends it only to new subscribers.
 * It fires for the two cases that should get it: a typed address that
 * belongs to nobody, and somebody who arrived here from a gift without ever
 * having joined the list.
 */
export const supporterDetails = {
  action: "https://app.kit.com/forms/9918609/subscriptions",
  formId: "9918609",
  emailField: "email_address",
  phoneField: "fields[phone]",
  addressField: "fields[address]",
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
 * A column with an href gets a linked heading carrying an arrow. An href
 * starting with http is treated as external by SiteFooter and opens in a
 * new tab.
 *
 * A column without an href gets a plain heading. Follow Us is the only one,
 * because it has no single destination: the row of marks beneath it is the
 * link, and there will be more than one of them. Pointing the heading at
 * whichever account happens to sit first in the socials list was arbitrary
 * and would have quietly changed meaning the day a second account was added.
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
    body: "Follow the work as it happens",
    socials: true,
  },
] as const;

/**
 * An href starting with http is treated as external by SiteFooter and
 * opens in a new tab.
 *
 * The site credit is http rather than https on purpose. jeremymansfield.com
 * serves a certificate that Chrome rejects on the www host with
 * ERR_CERT_COMMON_NAME_INVALID, and an interstitial warning reached from
 * this organization's footer is worse than a plain http link. Move it to
 * https the day that certificate is fixed.
 */
export const legalLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Site Credits", href: "http://www.jeremymansfield.com/" },
] as const;

/**
 * "All rights reserved" is deliberately absent: vestigial in the US since
 * the Berne Convention took effect in 1989. The EIN is deliberately absent
 * too, and lives on the Give page where a donor needs it.
 */
export const copyrightLine = `© ${new Date().getFullYear()} ${org.legalName}  ·  A 501(c)(3) nonprofit organization`;
