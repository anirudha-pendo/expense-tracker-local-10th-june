export function AboutPage() {
  return (
    <div className="min-h-svh bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>

        <div className="space-y-8">
          <section>
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
                — About —
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Ledger</h1>
            <p className="text-lg text-muted-foreground">Local finance tracking without compromise</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What is Ledger?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ledger is a personal finance tracking application designed with privacy and simplicity at its core.
              Unlike traditional finance apps that send your data to external servers, Ledger keeps all your financial
              information on your device—completely under your control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Local-First Storage:</strong> All data stays on your device. No cloud synchronization, no external servers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Transaction Tracking:</strong> Easily log and categorize your expenses and income.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Budget Management:</strong> Set budgets for different categories and monitor your spending.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Financial Goals:</strong> Set and track financial goals to help you achieve your targets.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Insights & Analytics:</strong> Visualize your spending patterns with charts and detailed insights.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">
                  <strong>Clean, Intuitive Interface:</strong> Designed to be simple yet powerful for personal finance management.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Privacy & Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Your financial data is sensitive and personal. That's why Ledger never collects, stores, or transmits
              your information to external servers. All processing happens locally on your device, ensuring maximum privacy
              and security.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that personal finance apps should be just that—personal. Your data, your device, your control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How to Get Started</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-muted-foreground">Create a new account with a username and password</li>
              <li className="text-muted-foreground">Set up your first workspace</li>
              <li className="text-muted-foreground">Add your first transaction or set up a budget</li>
              <li className="text-muted-foreground">Explore the dashboard to track your finances</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Is my data really private?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, absolutely. Ledger doesn't have any servers to send your data to. Everything stays on your device
                  and in your browser's local storage.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Can I backup my data?</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is stored in your browser's local storage. You can export your data from the settings page
                  for backup purposes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">What happens if I clear my browser data?</h3>
                <p className="text-sm text-muted-foreground">
                  If you clear your browser's local storage, your data will be deleted. Make sure to backup important
                  data before clearing browser data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Is Ledger free?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, Ledger is completely free to use. There are no subscriptions, ads, or premium features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Can I use Ledger on multiple devices?</h3>
                <p className="text-sm text-muted-foreground">
                  Since Ledger stores data locally on each device, you'll need to manually export and import data
                  if you want to use it across multiple devices.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Technology</h2>
            <p className="text-muted-foreground">
              Ledger is built with modern web technologies including React, TypeScript, and Tailwind CSS.
              The application uses IndexedDB for efficient local data storage and provides a responsive,
              beautiful user interface.
            </p>
          </section>

          <div className="border-t border-foreground pt-8 mt-8">
            <p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
              Data stays on this device — no servers, no tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
