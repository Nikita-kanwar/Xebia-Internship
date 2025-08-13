    class Account {
      constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
      }

      deposit(amount) {
        if (amount > 0) {
          this.balance += amount;
          console.log(`${this.owner} deposited $${amount}. New balance: $${this.balance}`);
        } else {
          console.log("Deposit amount must be positive.");
        }
      }

      withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
          this.balance -= amount;
          console.log(`${this.owner} withdrew $${amount}. New balance: $${this.balance}`);
        } else {
          console.log("Invalid withdrawal amount.");
        }
      }
    }

    Account.prototype.getBalance = function() {
      console.log(`${this.owner}'s current balance: $${this.balance}`);
    };

    const user1 = new Account("Alice", 500);
    const user2 = new Account("Bob", 1000);

    user1.deposit(200);
    user1.withdraw(100);

    user2.deposit(500);
    user2.withdraw(1200);
    user1.getBalance();
    user2.getBalance();
