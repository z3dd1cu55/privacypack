import Link from "next/link";

const Privacy = () => {
    return (
        <div className="flex w-screen flex-col items-center">
            <div className="flex w-full flex-col gap-5 p-8 text-gray-400 lg:w-[56rem] lg:p-16">
                <h1 className="mb-8 text-3xl text-white">PRIVACY POLICY</h1>
                <p>Last Updated: August 22, 2025</p>
                <p>
                    We respect the privacy of our Users (&quot;User&quot;,
                    &quot;your&quot;, &quot;you&quot;). This Privacy Policy
                    (&quot;Policy&quot;) explains how we handle your information
                    when you use our website, <strong>privacypack.org</strong>{" "}
                    (the &quot;Site&quot;). Please read this Policy carefully to
                    understand our practices regarding your information and how
                    we treat it.
                </p>
                <p>
                    By accessing or using the Site, you agree to the terms of
                    this Policy. If you do not agree with the terms of this
                    Policy, please do not access or use the Site.
                </p>

                <h2 className="text-xl text-white">1. Introduction</h2>
                <p>
                    <strong>privacypack.org</strong> allows users to create and
                    share cards showing the mainstream apps they previously used
                    and the privacy-respecting alternatives they have switched
                    to. We prioritize user privacy and aim to minimize data
                    collection.
                </p>

                <h2 className="text-xl text-white">
                    2. Data Collection and Usage
                </h2>
                <h3 className="text-lg text-white">Information Collected:</h3>
                <ul className="list-disc pl-8">
                    <li>
                        <strong>Privacy Packs:</strong> Users may create and
                        share cards displaying &quot;before&quot; and
                        &quot;after&quot; app logos. These are publicly viewable
                        if shared.
                    </li>
                    <li>
                        <strong>IP Addresses:</strong> We temporarily store
                        hashed IP addresses for rate-limiting purposes only.
                    </li>
                    <li>
                        <strong>App Counts:</strong> We track the number of
                        times each app appears in user-created packs to display
                        aggregate counts (e.g., &quot;App X – in 56
                        packs&quot;). This data is anonymized and does not
                        identify individual users.
                    </li>
                </ul>

                <h3 className="text-lg text-white">Usage of Information:</h3>
                <ul className="list-disc pl-8">
                    <li>
                        Hashed IPs are used solely to prevent abuse and
                        excessive usage. We do not store the original IP
                        addresses.
                    </li>
                    <li>
                        User-generated cards are visible to others only if
                        shared.
                    </li>
                    <li>
                        Aggregate app count data is used to provide site
                        features such as showing popularity trends. This
                        information is anonymized and not linked to any
                        individual user.
                    </li>
                </ul>

                <h2 className="text-xl text-white">3. Data Sharing</h2>
                <ul className="list-disc pl-8">
                    <li>
                        We do not sell, trade, or otherwise share personal
                        information with third parties.
                    </li>
                    <li>
                        All data transmissions are encrypted using TLS to ensure
                        security and integrity between the user and the Site.
                    </li>
                    <li>
                        User-shared cards may be publicly viewable, depending on
                        how users choose to share them.
                    </li>
                    <li>
                        Aggregate app count data is displayed publicly, but is
                        anonymized and does not identify individual users.
                    </li>
                </ul>

                <h2 className="text-xl text-white">4. User Rights</h2>
                <p>
                    Users have the right to stop using the Site at any time.
                    Since we only store hashed IPs for rate-limiting and
                    aggregate anonymized app counts, there is minimal personal
                    data retained. If you wish to remove any publicly shared
                    card, you can do so through the Site interface.
                </p>

                <h2 className="text-xl text-white">5. Data Security</h2>
                <ul className="list-disc pl-8">
                    <li>
                        We use TLS encryption for all communications between
                        users and the Site.
                    </li>
                    <li>
                        Hashed IPs are stored securely and are never associated
                        with user identity beyond rate-limiting.
                    </li>
                </ul>

                <h2 className="text-xl text-white">6. Data Retention</h2>
                <ul className="list-disc pl-8">
                    <li>
                        Hashed IPs are retained only as long as necessary for
                        rate-limiting purposes.
                    </li>
                    <li>
                        Aggregate app count data is retained to provide site
                        features and display popularity trends.
                    </li>
                    <li>
                        User-shared cards remain publicly available until
                        removed by the user.
                    </li>
                </ul>

                <h2 className="text-xl text-white">
                    7. Children&apos;s Privacy
                </h2>
                <p>
                    The Site is not intended for children under the age of 13,
                    and we do not knowingly collect personal data from children
                    under 13. If you are under 13, please do not use the Site.
                </p>

                <h2 className="text-xl text-white">8. Cookies</h2>
                <ul className="list-disc pl-8">
                    <li>
                        We do not place cookies on your device for tracking
                        purposes.
                    </li>
                </ul>

                <h2 className="text-xl text-white">
                    9. Changes to this Privacy Policy
                </h2>
                <p>
                    We may update this Privacy Policy to reflect changes in our
                    practices or for other operational, legal, or regulatory
                    reasons. Updates will be posted on this page. Continued use
                    of the Site after changes constitutes acceptance of the
                    updated Policy.
                </p>

                <h2 className="text-xl text-white">10. Contact Us</h2>
                <p>
                    You can reach us by email at:{" "}
                    <a
                        href="mailto: privacy@ente.io"
                        className="underline underline-offset-2"
                    >
                        privacy@ente.io
                    </a>
                </p>
                <p>
                    Mailing address: EnteIO Technologies Private Limited, 72/12,
                    Whitefield, Bengaluru, India.
                </p>

                <Link href="/" className="mt-8 underline underline-offset-2">
                    Go back to homepage
                </Link>
            </div>
        </div>
    );
};

export default Privacy;
