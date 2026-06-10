import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfConditionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TermsOfConditionsDialog({ open, onOpenChange, onAccept }: TermsOfConditionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Terms of Conditions</DialogTitle>
          <DialogDescription>Please read and accept our terms before continuing</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By creating an account and using the Ledger service, you agree to comply with and be bound by these
                Terms of Conditions.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Use License</h3>
              <p className="text-muted-foreground">
                Permission is granted to use the materials on Ledger for personal, non-commercial use only. You may
                not modify, copy, distribute, or transmit any materials without permission.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Disclaimer</h3>
              <p className="text-muted-foreground">
                The materials on Ledger are provided on an 'as is' basis. Ledger makes no warranties, expressed or
                implied, and hereby disclaims all warranties of merchantability, fitness for a particular purpose, or
                non-infringement.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Limitations</h3>
              <p className="text-muted-foreground">
                In no event shall Ledger be liable for any damages arising out of the use or inability to use the
                materials, even if notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. Data Privacy</h3>
              <p className="text-muted-foreground">
                Ledger is a local-first application. All your financial data stays on your device. We do not collect,
                store, or transmit your personal or financial information to any external servers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. User Account Responsibility</h3>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account information and password. You
                agree to accept responsibility for all activities under your account.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Modifications</h3>
              <p className="text-muted-foreground">
                Ledger may revise these terms at any time without notice. By using this website, you are agreeing to
                be bound by the then current version of these terms.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">8. Governing Law</h3>
              <p className="text-muted-foreground">
                These terms are governed by and construed in accordance with applicable laws, and you irrevocably
                submit to the exclusive jurisdiction of the courts.
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept & Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
