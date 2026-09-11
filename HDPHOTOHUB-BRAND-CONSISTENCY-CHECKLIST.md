# HDPhotoHub Brand-Consistency Checklist

LENZ's real estate booking flow (`siteConfig.bookRealEstateUrl` →
`https://throughthelenzphotography.hd.pics/order`) points to an external, third-party platform I
have no login access to and can't inspect. The subdomain itself
(`throughthelenzphotography.hd.pics`) still carries the old "Through the Lenz Photography" brand
name — everything below is a **manual review list for your HDPhotoHub account**, not something I've
checked or can verify from here. I'm not assuming any of it is wrong; I genuinely don't know what's
currently configured on HDPhotoHub's side.

Nothing on this list has been changed. Review each item in your own HDPhotoHub account and update
what needs it.

## Where the old brand/domain may still appear

- [ ] **Site attribution / "powered by" or footer credit** — some HDPhotoHub property-site
      templates show a photographer attribution line. Check it reads "LENZ," not "Through The
      Lenz" or "Through The Lenz Photography."
- [ ] **Website URL shown to clients** — anywhere HDPhotoHub displays or links back to "your
      website" (agent-facing dashboard, property page footer, etc.), confirm it points to
      `lenzphotos.com`, not an old domain.
- [ ] **Email templates / signatures sent by HDPhotoHub** — order confirmations, delivery
      notifications, and any automated client-facing email HDPhotoHub sends on your behalf. Check
      the sender name, signature block, and any linked website URL.
- [ ] **Branding / logo uploaded to HDPhotoHub** — if your account has a logo file uploaded for
      property sites or client-facing pages, confirm it's the current LENZ gold wordmark, not an
      older logo.
- [ ] **Order/booking page itself** — the actual page your `bookRealEstateUrl` links to
      (`throughthelenzphotography.hd.pics/order`). Check the page header, any visible business name,
      and confirm pricing/service descriptions match what LENZ currently offers.
- [ ] **Property-site defaults** — if HDPhotoHub generates a listing microsite per property (common
      for real estate photography platforms), check the default template's business name, contact
      info, and any "back to photographer" link.
- [ ] **Automated communication to agents/clients** — SMS or email triggered automatically by order
      status changes (delivery ready, order received, etc.) — same check as the email templates
      item above, but specifically the automated/triggered messages rather than one-off manual
      emails.
- [ ] **Any "back to website" / "visit our website" links** — wherever HDPhotoHub surfaces a link
      back to your main site (property pages, the booking flow itself, confirmation screens),
      confirm the target is `lenzphotos.com`.

## Domain note

The current booking link uses the `throughthelenzphotography.hd.pics` subdomain, which HDPhotoHub
issued and which still carries the old brand name in its hostname. **`book.lenzphotos.com`** is
being preserved as a possible future branded subdomain for this booking flow (would need a CNAME
record pointing at HDPhotoHub, plus reconfiguring the booking system to serve under that hostname)
— **not configured, and nothing about this should be set up without your explicit go-ahead.** If
you'd like to pursue it later, that's a DNS change plus an HDPhotoHub-side domain-mapping step,
both of which are account/registrar actions outside this repo.

## What happens once you've reviewed this

Send me whatever you find — screenshots, copy-pasted text, or just "X still shows the old name" —
and I'll treat those as confirmed facts rather than guessing. I won't update
`siteConfig.bookRealEstateUrl` or anything else based on assumptions about what's in your
HDPhotoHub account.
