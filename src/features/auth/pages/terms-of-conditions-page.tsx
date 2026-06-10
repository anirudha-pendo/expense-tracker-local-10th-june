export function TermsOfConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Conditions</h1>

      <div className="space-y-6 text-sm">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By creating an account and using the Ledger service, you agree to comply with and be bound by these Terms
            of Conditions. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
          <p className="text-muted-foreground">
            Permission is granted to temporarily download one copy of the materials (information or software) on
            Ledger for personal, non-commercial transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on Ledger</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
          <p className="text-muted-foreground">
            The materials on Ledger are provided on an 'as is' basis. Ledger makes no warranties, expressed or implied,
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
            property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
          <p className="text-muted-foreground">
            In no event shall Ledger or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on Ledger, even if Ledger or an authorized representative has been
            notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Accuracy of Materials</h2>
          <p className="text-muted-foreground">
            The materials appearing on Ledger could include technical, typographical, or photographic errors. Ledger
            does not warrant that any of the materials on the website are accurate, complete, or current. Ledger may
            make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Materials and Links</h2>
          <p className="text-muted-foreground">
            Ledger has not reviewed all of the sites linked to its website and is not responsible for the contents of
            any such linked site. The inclusion of any link does not imply endorsement by Ledger of the site. Use of
            any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Modifications</h2>
          <p className="text-muted-foreground">
            Ledger may revise these terms of service for its website at any time without notice. By using this
            website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
          <p className="text-muted-foreground">
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
            in which Ledger operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that
            location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Data Privacy</h2>
          <p className="text-muted-foreground">
            Ledger is a local-first application. All your financial data stays on your device. We do not collect,
            store, or transmit your personal or financial information to any external servers. Your data is completely
            under your control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. User Account Responsibility</h2>
          <p className="text-muted-foreground">
            You are responsible for maintaining the confidentiality of your account information and password and for
            restricting access to your device. You agree to accept responsibility for all activities that occur under
            your account. You must notify us immediately of any unauthorized uses of your account.
          </p>
        </section>
      </div>
    </div>
  );
}
