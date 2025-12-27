;; Simple ComCelo contract on Stacks (Clarity)
;; Stores per-user data and supports a basic ping

(define-data-var owner principal tx-sender)
(define-map user-data principal (string-ascii 128))

(define-public (set-owner (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) (err u403))
    (var-set owner new-owner)
    (ok new-owner)))

(define-public (set-data (value (string-ascii 128)))
  (begin
    (map-set user-data tx-sender value)
    (ok true)))

(define-read-only (get-data (who principal))
  (match (map-get? user-data who)
    data (ok data)
    (ok "")))

(define-read-only (ping)
  (ok true))
